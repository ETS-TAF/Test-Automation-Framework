import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import * as k8s from "@pulumi/kubernetes";
import * as path from "path";
import { seleniumService } from "../selenium";
import { readK8sDefinition } from "../utils/k8s-definitions";
import { eksCluster, k8sNamespace } from "../eks-cluster";

// Build and publish to an ECR registry.
const repo_team_4 = new awsx.ecr.Repository("team-4");
const image_client = repo_team_4.buildAndPushImage(path.resolve(process.cwd(), '../..', 'tests-ui/team-4/client'));
const image_server = repo_team_4.buildAndPushImage(path.resolve(process.cwd(), '../..', 'tests-ui/team-4/server'));

// Deploy server
const serverDeploymentDefinition = readK8sDefinition('team-4-selenium/server/Deployment.yml');
serverDeploymentDefinition.spec.template.spec.containers[0].image = image_server;
serverDeploymentDefinition.spec.template.spec.containers[0].env[0].value = pulumi.interpolate`http://${seleniumService.spec.clusterIP}:4444/wd/hub`;
const serverDeployment = new k8s.apps.v1.Deployment('team-4-server-deployment', serverDeploymentDefinition, { provider: eksCluster.provider, dependsOn: [k8sNamespace] });

const serverServiceDefinition = readK8sDefinition('team-4-selenium/server/Service.yml');
const serverService = new k8s.core.v1.Service('team-4-server-service', serverServiceDefinition, {provider: eksCluster.provider, dependsOn: [serverDeployment]});

// Deploy client
const clientDeploymentDefinition = readK8sDefinition('team-4-selenium/client/Deployment.yml');
clientDeploymentDefinition.spec.template.spec.containers[0].image = image_client;
clientDeploymentDefinition.spec.template.spec.containers[0].env[0].value = pulumi.interpolate`http://${serverService.status.loadBalancer.ingress[0].hostname}:${serverService.status.loadBalancer.ingress[0].ports[0].port}`
const clientDeployment = new k8s.apps.v1.Deployment('team-4-client-deployment', clientDeploymentDefinition, { provider: eksCluster.provider, dependsOn: [k8sNamespace] });

const clientServiceDefinition = readK8sDefinition('team-4-selenium/client/Service.yml');
const clientService = new k8s.core.v1.Service('team-4-client-service', clientServiceDefinition, {provider: eksCluster.provider, dependsOn: [clientDeployment]});

export const team_4_url = clientService.status.loadBalancer.ingress[0].hostname;