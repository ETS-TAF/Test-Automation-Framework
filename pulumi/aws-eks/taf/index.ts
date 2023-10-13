import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as k8s from "@pulumi/kubernetes";
import * as path from "path";
import {readK8sDefinition} from "../utils/k8s-definitions";
import {eksCluster, k8sNamespace} from "../eks-cluster";
import {microserviceConfigMapResource} from "../team-6_testapi";

// Grab some values from the Pulumi configuration (or use default values)
const config = new pulumi.Config();

// Build and publish to an ECR registry.
const repo_front = new awsx.ecr.Repository("taf-front");
const image_front = repo_front.buildAndPushImage(path.resolve(process.cwd(), "../..", "frontend"));
const repo_back = new awsx.ecr.Repository("taf-back");
const image_back = repo_back.buildAndPushImage({
    dockerfile: path.resolve(process.cwd(), '../..', 'backend/Dockerfile'),
    context: path.resolve(process.cwd(), '../..')
});

// Starting a new DB instance for the TAF Backend
const DB_Username = config.require("TAF_DB_Username");
export const DB_Password = config.requireSecret("TAF_DB_Password");

/*const DB_TAF_Backend = new aws.rds.Instance("db-taf-backend", {
    allocatedStorage: 10,
    dbName: "DB_TAF_Backend",
    engine: "mysql",
    engineVersion: "8.0",
    instanceClass: "db.t3.micro",
    parameterGroupName: "default.mysql8.0",
    username: `${DB_Username}`,
    password: pulumi.interpolate`${DB_Password}`,
    skipFinalSnapshot: true,
    allowMajorVersionUpgrade: true,
});
*/

export const DB_Address = "nostrasoft.com:3306/nostr321_taf-db" //DB_TAF_Backend.endpoint;

// Deploying TAF Backend
const backendSecretDefinition = readK8sDefinition('taf/backend/Secret.yml');
backendSecretDefinition.stringData.username = DB_Username;
backendSecretDefinition.stringData.password = pulumi.interpolate`${DB_Password}`;
const backendSecret = new k8s.core.v1.Secret('taf-backend-secret', backendSecretDefinition, {
    provider: eksCluster.provider,
    dependsOn: [k8sNamespace]
});

const backendDeploymentDefinition = readK8sDefinition('taf/backend/Deployment.yml');
backendDeploymentDefinition.spec.template.spec.containers[0].image = image_back;
backendDeploymentDefinition.spec.template.spec.containers[0].env[0].value = pulumi.interpolate`jdbc:mysql://${DB_Address}` ///${DB_TAF_Backend.dbName}`;
const backendDeployment = new k8s.apps.v1.Deployment('taf-backend-deployment', backendDeploymentDefinition, {
    provider: eksCluster.provider,
    dependsOn: [backendSecret, microserviceConfigMapResource]
});

const backendServiceDefinition = readK8sDefinition('taf/backend/Service.yml');
const backendService = new k8s.core.v1.Service('taf-backend-service', backendServiceDefinition, {
    provider: eksCluster.provider,
    dependsOn: [backendDeployment]
});

// Export the URL for the load balanced service.
export const back_url = backendService.status.loadBalancer.ingress[0].hostname;

// Deploying TAF Frontend
const frontendDeploymentDefinition = readK8sDefinition('taf/frontend/Deployment.yml');
frontendDeploymentDefinition.spec.template.spec.containers[0].image = image_front;
const frontendDeployment = new k8s.apps.v1.Deployment('taf-frontend-deployment', frontendDeploymentDefinition, {
    provider: eksCluster.provider,
    dependsOn: [k8sNamespace]
});

const frontendServiceDefinition = readK8sDefinition('taf/frontend/Service.yml');
const frontendService = new k8s.core.v1.Service('taf-frontend-service', frontendServiceDefinition, {
    provider: eksCluster.provider,
    dependsOn: [frontendDeployment]
});

// Export the URL for the load balanced service.
export const front_url = frontendService.status.loadBalancer.ingress[0].hostname;