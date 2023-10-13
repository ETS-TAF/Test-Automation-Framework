
import * as gcp from '@pulumi/gcp';

export const cloudRunService = new gcp.projects.Service('cloudrun', {
    service: 'run.googleapis.com'
});

export const iamService = new gcp.projects.Service('iam', {
    service: 'iam.googleapis.com'
});

export const cloudResourceManagerService = new gcp.projects.Service('cloudresourcemanager', {
    service: 'cloudresourcemanager.googleapis.com'
});

export const sqlAdminService = new gcp.projects.Service('sqladmin', {
    service: 'sqladmin.googleapis.com'
});

export const artifactRegistryService = new gcp.projects.Service('artifactregistry', {
    service: 'artifactregistry.googleapis.com'
});