import deployment from '../tfinjsConfig/deployment';
import deploymentParams from '../tfinjsConfig/deploymentParams';
import namespace from '../tfinjsConfig/namespace';
import awsProvider from '../tfinjsConfig/providers/aws';

/* the api is a collection of resources under
   a certain namespace and deployment params. */
const api = deployment.createApi({
  deploymentParams: deploymentParams(),
  namespace: namespace(__filename),
  provider: awsProvider,
});

export default api;
