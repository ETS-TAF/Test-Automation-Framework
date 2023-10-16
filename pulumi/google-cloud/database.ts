import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';
import { sqlAdminService } from './apis';

const cfg = new pulumi.Config();

export const dbInstance = new gcp.sql.DatabaseInstance("wikijs-db-instance", {
    databaseVersion: 'MYSQL_8_0',
    region: 'europe-west1',

    settings: {
        tier: 'db-f1-micro',

        ipConfiguration: {
            ipv4Enabled: true,
        }
    },

    deletionProtection: false
}, { dependsOn: [sqlAdminService]});

export const database = new gcp.sql.Database('wikijs', {
    instance: dbInstance.name,
});

export const dbUser = new gcp.sql.User('wikijs-db-user-1', {
    name: 'wikijs-user',
    password: cfg.requireSecret('db-user-password'),
    instance: dbInstance.name
});