import * as gcp from '@pulumi/gcp';
import * as docker from '@pulumi/docker';
import * as pulumi from '@pulumi/pulumi';
import * as path from 'path';
import { cloudRunService, iamService } from './apis';
import { dockerRegistry } from './registry';

const cfg = new pulumi.Config();
const project = cfg.require('gcp-project');

export const deployWikiJS = (dbInstance: gcp.sql.DatabaseInstance, db: gcp.sql.Database, dbUser: gcp.sql.User) => {

    const serviceAccount = new gcp.serviceaccount.Account('wikijs-service-user', {
        accountId: 'wikijs-service-user'
    }, {dependsOn: [iamService]});

    const serviceAccountPermission = new gcp.projects.IAMBinding('wikijs-service-user-iam', {
        members: [pulumi.interpolate`serviceAccount:${serviceAccount.email}`],
        role: 'roles/iam.serviceAccountUser',
        project: project
    });

    const accessToCloudSQL = new gcp.projects.IAMBinding('wikijs-service-sql-access', {
        project: project,
        role: 'roles/cloudsql.client',
        members: [
            pulumi.interpolate`serviceAccount:${serviceAccount.email}`
        ]
    });

    const appService = new gcp.cloudrun.Service('wikijs', {
        location: 'europe-west1',

        traffics: [{
            percent: 100,
            latestRevision: true
        }],

        template: {
            metadata: {
                annotations: {
                    'autoscaling.knative.dev/maxScale': '1',
                    'autoscaling.knative.dev/minScale': '1',
                    "run.googleapis.com/cloudsql-instances": dbInstance.connectionName,
                }
            },
            spec: {
                serviceAccountName: serviceAccount.email,
                containers: [{
                    image: pulumi.interpolate`${dockerRegistry.location}-docker.pkg.dev/${project}/${dockerRegistry.name}/wikijs:2.5.292`,
                    ports: [{
                        containerPort: 3000
                    }],
                    envs: [
                        {
                            name: 'DB_TYPE',
                            value: 'mysql'
                        },
                        {
                            name: 'DATABASE_URL',
                            value: pulumi.interpolate`mysql://${dbUser.name}:${cfg.requireSecret('db-user-password')}@localhost:3306/${db.name}?socketPath=/cloudsql/${dbInstance.connectionName}`
                        },
                        {
                            name: 'DB_HOST',
                            value: 'localhost'
                        },
                        {
                            name: 'DB_PORT',
                            value: '3306'
                        },
                        {
                            name: 'DB_USER',
                            value: dbUser.name
                        },
                        {
                            name: 'DB_PASSWORD',
                            value: cfg.requireSecret('db-user-password')
                        },
                        {
                            name: 'DB_NAME',
                            value: db.name
                        },
                        {
                            name: 'DB_SOCKET',
                            value: pulumi.interpolate`/cloudsql/${dbInstance.connectionName}`
                        }
                    ]
                }]
            },
        },
        autogenerateRevisionName: true,
    }, {dependsOn: [cloudRunService, serviceAccountPermission, dockerRegistry, accessToCloudSQL]});

    const noauthIAMPolicy = gcp.organizations.getIAMPolicy({
        bindings: [{
            role: "roles/run.invoker",
            members: ["allUsers"],
        }],
    });
    const noauthIamPolicy = new gcp.cloudrun.IamPolicy("noauthIamPolicy", {
        location: appService.location,
        project: appService.project,
        service: appService.name,
        policyData: noauthIAMPolicy.then(noauthIAMPolicy => noauthIAMPolicy.policyData),
    });
}