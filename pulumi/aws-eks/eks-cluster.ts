import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import * as aws from "@pulumi/aws";
import * as eks from "@pulumi/eks";
import * as k8s from "@pulumi/kubernetes";
import { readK8sDefinition } from "./utils/k8s-definitions";

// Grab some values from the Pulumi configuration (or use default values)
const config = new pulumi.Config();
const minClusterSize = config.getNumber("minClusterSize") || 3;
const maxClusterSize = config.getNumber("maxClusterSize") || 4;
const desiredClusterSize = config.getNumber("desiredClusterSize") || 3;
const eksNodeInstanceType = config.get("eksNodeInstanceType") || "t3a.small";
const vpcNetworkCidr = config.get("vpcNetworkCidr") || "10.0.0.0/16";


// Create a new VPC
export const eksVpc = new awsx.ec2.Vpc("eks-vpc", {
    enableDnsHostnames: true,
    cidrBlock: vpcNetworkCidr,
    numberOfNatGateways: 1,
    subnets: [
        {
            type: 'public',
            tags: {
                'kubernetes.io/role/elb': '1',
            },
        },
        {
            type: 'private',
            tags: {
                'kubernetes.io/role/internal-elb': '1',
            }
        }
    ],
});

const clusterSecurityGroup = new aws.ec2.SecurityGroup('clustersecgrp', {
    vpcId: eksVpc.id,
    ingress: [{
      protocol: 'all',
      fromPort: -1,
      toPort: -1,
      cidrBlocks: ['0.0.0.0/0'],
    }],
    egress: [{
      protocol: 'all',
      fromPort: -1,
      toPort: -1,
      cidrBlocks: ['0.0.0.0/0'],
    }]
  });
  

// Using default-vpc to cut on cost
// new awsx.ec2.DefaultVpc("default-vpc");


export const aws_auth_configMap = pulumi.output(aws.iam.getGroup({
    groupName: "CloudDeveloper",
})).apply((iamUserGroup)=>{
    return iamUserGroup.users.map((user)=>{
        return {
            userArn: user.arn,
            groups: ["system:masters"],
            username: "pulumi:admins",
        };
    })
});

// Create the EKS cluster
export const eksCluster = new eks.Cluster("eks-cluster", {
    // Put the cluster in the new VPC created earlier
    vpcId: eksVpc.id,
    // Public subnets will be used for load balancers
    publicSubnetIds: eksVpc.publicSubnetIds,
    // Private subnets will be used for cluster nodes
    privateSubnetIds: eksVpc.privateSubnetIds,
    // Change configuration values to change any of the following settings
    instanceType: eksNodeInstanceType,
    desiredCapacity: desiredClusterSize,
    minSize: minClusterSize,
    maxSize: maxClusterSize,
    // Do not give the worker nodes public IP addresses
    nodeAssociatePublicIpAddress: true,
    // Uncomment the next two lines for a private cluster (VPN access required)
    // endpointPrivateAccess: true,
    // endpointPublicAccess: true
    userMappings: aws_auth_configMap,
    createOidcProvider: true,
    clusterSecurityGroup,
});

// Export some values for use elsewhere
export const kubeconfig = eksCluster.kubeconfig;
export const vpcId = eksVpc.id;

// Namespace to isolate resources used for TAF
const nsDefinition = readK8sDefinition('Namespace.yml');
export const k8sNamespace = new k8s.core.v1.Namespace("taf", nsDefinition, {provider: eksCluster.provider});
