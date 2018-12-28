import {
  awsRegion,
  awsAccoundId,
} from '../tfinjsConfig/providers/aws';
import api from './api';
import petLambdaExecRole from './petLambdaExecRole';

const petLambda = api.resource('aws_dynamodb_table', 'pets', {
  description: 'pet lambda',
  /* api.reference registers a remote state
     on the petLambda resource and gets the
     terraform interpolation string to reference
     the arn of the remote state */
  role: api.reference(petLambdaExecRole, 'arn'),
  /* function_name === s3_key here.
     api.versionedName is a helper that
     returns a callback that returns the
     versionedName of the petLambda resource */
  function_name: api.versionedName(),
  s3_key: (resource) => resource.versionedName(),
  s3_bucket: 'pet-lambda-bucket',
  handler: 'service.handler',
  runtime: 'nodejs8.10',
  timeout: 20,
  memory_size: 512,
});

const logGroupPrefix = `arn:aws:logs:${awsRegion}:${awsAccoundId}:log-group:/aws/lambda`;
const petLambdaName = petLambda.versionedName();

const cloudwatchPolicy = api.resource(
  'aws_iam_policy',
  'cloudwatch_attachable_policy',
  {
    policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Action: ['logs:CreateLogStream'],
          Effect: 'Allow',
          Resource: `${logGroupPrefix}/${petLambdaName}:*`,
        },
        {
          Action: ['logs:PutLogEvents'],
          Effect: 'Allow',
          Resource: `${logGroupPrefix}/${petLambdaName}:*:*`,
        },
      ],
    }),
  },
);

api.resource('aws_iam_role_policy_attachment', 'cloud_watch_role_attachment', {
  role: api.reference(petLambdaExecRole, 'name'),
  policy_arn: api.reference(cloudwatchPolicy, 'arn'),
});
