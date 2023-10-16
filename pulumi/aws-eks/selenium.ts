import * as awsx from "@pulumi/awsx";
import * as k8s from "@pulumi/kubernetes";
import * as path from "path";
import { eksCluster, k8sNamespace } from "./eks-cluster";
import { readK8sDefinition } from "./utils/k8s-definitions";

// Build and publish to an ECR registry.
const repo_selenium = new awsx.ecr.Repository("selenium");
const image_selenium_node = repo_selenium.buildAndPushImage(path.resolve(process.cwd(), "../..", "selenium/node"));
const image_selenium_hub = repo_selenium.buildAndPushImage(path.resolve(process.cwd(), "../..", "selenium/hub"));

// Deploy Selenium server
const seleniumHubDeploymentDefinition = readK8sDefinition('team-1-selenium/selenium-server/Deployment-hub.yml');
seleniumHubDeploymentDefinition.spec.template.spec.containers[0].image = image_selenium_hub;
const seleniumHubDeployment = new k8s.apps.v1.Deployment('team-1-selenium-hub-deployment', seleniumHubDeploymentDefinition, { provider: eksCluster.provider, dependsOn: [k8sNamespace] });

const seleniumServiceDefinition = readK8sDefinition('team-1-selenium/selenium-server/Service.yml');
export const seleniumService = new k8s.core.v1.Service('team-1-selenium-service', seleniumServiceDefinition, {provider: eksCluster.provider, dependsOn: [seleniumHubDeployment]});

const seleniumNodeDeploymentDefinition = readK8sDefinition('team-1-selenium/selenium-server/Deployment-node.yml');
seleniumNodeDeploymentDefinition.spec.template.spec.containers[0].image = image_selenium_node;
const seleniumNodeDeployment = new k8s.apps.v1.Deployment('team-1-selenium-node-deployment', seleniumNodeDeploymentDefinition, { provider: eksCluster.provider, dependsOn: [seleniumService] });
