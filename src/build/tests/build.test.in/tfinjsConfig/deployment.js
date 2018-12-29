import { Deployment, Backend, Provider } from 'tfinjs';
import awsProviderUri from 'tfinjs/uris/aws';
import { awsAccoundId } from './providers/aws';

const backendBucketRegion = 'eu-north-1';

const backendBucketName = 'terraform-state-prod';

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
    provider: new Provider(
      'aws',
      {
        region: backendBucketRegion,
        assume_role: {
          role_arn: `arn:aws:iam::${awsAccoundId}:role/DeploymentRole`,
        },
      },
      awsProviderUri(awsAccoundId, backendBucketRegion),
    ),
    create: (resource) =>
      resource('aws_s3_bucket', 'terraform_state_prod', {
        bucket: backendBucketName,
        acl: 'private',
        versioning: {
          enabled: true,
        },
      }),
  }),
});

export default deployment;
