import { Deployment, Backend } from 'tfinjs';

const deployment = new Deployment({
  backend: new Backend('s3', {
    backendConfig: (versionedName) => ({
      bucket: 'terraform-state-prod',
      key: `${versionedName}.terraform.tfstate`,
      region: 'us-east-1',
    }),
    dataConfig: (versionedName) => ({
      bucket: 'terraform-state-prod',
      key: `${versionedName}.terraform.tfstate`,
      region: 'us-east-1',
    }),
  }),
});


export default deployment;
