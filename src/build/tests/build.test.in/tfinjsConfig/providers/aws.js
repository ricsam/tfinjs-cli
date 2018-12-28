import { Provider } from 'tfinjs';
import awsProviderUri from 'tfinjs/uris/aws';

export const awsAccoundId = '133713371337';
export const awsRegion = 'eu-north-1';

const awsProvider = new Provider(
  'aws',
  {
    region: awsRegion,
    assume_role: {
      role_arn: `arn:aws:iam::${awsAccoundId}:role/DeploymentRole`,
    },
  },
  awsProviderUri(awsAccoundId, awsRegion),
);
export default awsProvider;
