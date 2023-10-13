import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import * as k8s from "@pulumi/kubernetes";
import * as path from "path";
import {readK8sDefinition} from "../utils/k8s-definitions";
import {eksCluster, k8sNamespace} from "../eks-cluster";


const config = new pulumi.Config("testapi");
const testapi_binded_port = config.requireNumber("bindedPort");


// Build and publish to an ECR registry.
const repo_team_4 = new awsx.ecr.Repository("team-6-testapi");
const image = repo_team_4.buildAndPushImage(path.resolve(process.cwd(), '../..', 'testapi'));

// Deploy server
const deploymentDefinition = readK8sDefinition('team-6-testapi/Deployment.yml');
deploymentDefinition.spec.template.spec.containers[0].image = image;
deploymentDefinition.spec.template.spec.containers[0].ports[0].containerPort = testapi_binded_port;
const deployment = new k8s.apps.v1.Deployment('team-6-testapi', deploymentDefinition, {
    provider: eksCluster.provider,
    dependsOn: [k8sNamespace]
});

const serviceDefinition = readK8sDefinition('team-6-testapi/Service.yml');
const service = new k8s.core.v1.Service('team-6-testapi-service', serviceDefinition, {
    provider: eksCluster.provider,
    dependsOn: [deployment]
});

export const team_6_url = service.spec.clusterIP;