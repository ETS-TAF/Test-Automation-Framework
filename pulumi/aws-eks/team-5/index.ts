import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as k8s from "@pulumi/kubernetes";
import * as path from "path";
import {readK8sDefinition} from "../utils/k8s-definitions";
import {eksCluster, k8sNamespace} from "../eks-cluster";
import {microserviceConfigMapResource} from "../team-6_testapi";


// Build and publish to an ECR registry.
const repo = new awsx.ecr.Repository("team-5");
const image_jmeter = repo.buildAndPushImage({
    dockerfile: path.resolve(process.cwd(), '../..', 'jmeter/Dockerfile'),
    context: path.resolve(process.cwd(), '../..')
});
const image_gatling = repo.buildAndPushImage({
    dockerfile: path.resolve(process.cwd(), '../..', 'gatling/Dockerfile'),
    context: path.resolve(process.cwd(), '../..')
});

// Deploying Jmeter
const jmeterDeploymentDefinition = readK8sDefinition('team-5-load-testing/jmeter/Deployment.yml');
jmeterDeploymentDefinition.spec.template.spec.containers[0].image = image_jmeter;
const jmeterDeployment = new k8s.apps.v1.Deployment('jmeter-deployment', jmeterDeploymentDefinition, {
    provider: eksCluster.provider,
    dependsOn: [k8sNamespace]
});

const jmeterServiceDefinition = readK8sDefinition('team-5-load-testing/jmeter/Service.yml');
const jmeterService = new k8s.core.v1.Service('jmeter-service', jmeterServiceDefinition, {
    provider: eksCluster.provider,
    dependsOn: [jmeterDeployment]
});

// Deploying Gatling
const gatlingDeploymentDefinition = readK8sDefinition('team-5-load-testing/gatling/Deployment.yml');
gatlingDeploymentDefinition.spec.template.spec.containers[0].image = image_gatling;
const gatlingDeployment = new k8s.apps.v1.Deployment('gatling-deployment', gatlingDeploymentDefinition, {
    provider: eksCluster.provider,
    dependsOn: [k8sNamespace]
});

const gatlingServiceDefinition = readK8sDefinition('team-5-load-testing/gatling/Service.yml');
const gatlingService = new k8s.core.v1.Service('gatling-service', gatlingServiceDefinition, {
    provider: eksCluster.provider,
    dependsOn: [gatlingDeployment]
});



export const jmeter_url = jmeterService.spec.clusterIP;
export const gatling_url = gatlingService.spec.clusterIP;