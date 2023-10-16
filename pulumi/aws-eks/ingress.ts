import * as pulumi from "@pulumi/pulumi";
import * as k8s from '@pulumi/kubernetes';
import * as aws from "@pulumi/aws";
import { eksCluster, eksVpc, k8sNamespace } from './eks-cluster';
import { readK8sDefinition } from "./utils/k8s-definitions";
import {ingressPermissions} from './ingress-permissions';

const globalIngressClassDefinition = readK8sDefinition('IngressClass.yml');
const globalIngressClass = new k8s.networking.v1.IngressClass('global-ingress-class', globalIngressClassDefinition, { provider: eksCluster.provider });

const clusterOidcProvider = eksCluster.core.oidcProvider;
const saAssumeRolePolicy = pulumi
  .all([clusterOidcProvider?.url, clusterOidcProvider?.arn, k8sNamespace.metadata.name])
  .apply(([url, arn, namespace]) => (
    aws.iam.getPolicyDocument({
      statements: [
        {
          actions: ['sts:AssumeRoleWithWebIdentity'],
          conditions: [
            {
              test: 'StringEquals',
              variable: `${url.replace('https://', '')}:sub`,
              values: [`system:serviceaccount:${namespace}:global-service-account`],
            },
            {
              test: 'StringEquals',
              variable: `${url.replace('https://', '')}:aud`,
              values: ['sts.amazonaws.com']
            },
          ],
          effect: 'Allow',
          principals: [{ identifiers: [arn], type: 'Federated' }],
        },
      ],
    })
  ));
const saRole = new aws.iam.Role('global-sa-role', {
    assumeRolePolicy: saAssumeRolePolicy.json,
});
const saPolicy = new aws.iam.Policy('policy', {
    description: 'Allow EKS access to resources',
    policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [{
            Action: [
              // Configure which services the SA should have access to.
              // Make it more strict / loose however you see fit.
              'ec2:*',
              'sqs:*',
              's3:*',
            ],
            Effect: 'Allow',
            Resource: '*',
        }],
    }),
});

// Attach the policy to the role
new aws.iam.RolePolicyAttachment('global-sa-role-policy', {
  policyArn: saPolicy.arn,
  role: saRole,
});

const serviceAccountDefinition = readK8sDefinition('ServiceAccount.yml');
serviceAccountDefinition.metadata.annotations['eks.amazonaws.com/role-arn'] = saRole.arn;
const serviceAccount = new k8s.core.v1.ServiceAccount('global-service-account', serviceAccountDefinition, { provider: eksCluster.provider });

const ingressControllerPolicy = new aws.iam.Policy('ingress-ctrl-policy', { policy: ingressPermissions });

new aws.iam.RolePolicyAttachment(`global-sa-ingress-ctrl`, {
    policyArn: ingressControllerPolicy.arn,
    role: saRole,
});

const alb = new k8s.helm.v3.Release(
    'alb',
    {
      namespace: k8sNamespace.metadata.name,
      repositoryOpts: {
        repo: 'https://aws.github.io/eks-charts',
      },
      chart: 'aws-load-balancer-controller',
      version: '1.4.2',
      values: {
        // @doc https://github.com/kubernetes-sigs/aws-load-balancer-controller/tree/main/helm/aws-load-balancer-controller#configuration
        vpcId: eksVpc.id,
        clusterName: eksCluster.eksCluster.name,
        ingressClass: globalIngressClass.metadata.name,
        // Important! Disable ingress class annotations as they are deprecated.
        // We're using a proper ingress class, so we don't need this.
        // @see https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/ingress/ingress_class/
        disableIngressClassAnnotation: true,
        createIngressClassResource: false, // Don't need it, since we already made one.
        serviceAccount: {
          name: serviceAccount.metadata.name,
          create: false, // Don't need it, since we already made one.
        },
      },
    },
    { provider: eksCluster.provider }
  );

const globalIngressDefinition = readK8sDefinition('Ingress.yml');

const globalIngress = new k8s.networking.v1.Ingress(
    'global-ingress', 
    globalIngressDefinition, 
    { 
        provider: eksCluster.provider,
        dependsOn: [
            globalIngressClass,
            k8sNamespace,
        ]
    }
);

export const url = globalIngress.status.loadBalancer.ingress[0].hostname;