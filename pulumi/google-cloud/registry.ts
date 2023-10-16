import * as gcp from '@pulumi/gcp';
import { artifactRegistryService } from './apis';

export const dockerRegistry = new gcp.artifactregistry.Repository('docker', {
    format: 'DOCKER',
    location: 'europe-west1',
    repositoryId: 'docker'
}, { dependsOn: [artifactRegistryService]});