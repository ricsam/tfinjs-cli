
/* eslint-env jest */
import { join } from 'path';
import './build.test.in/src/lambda';
import './build.test.in/src/petLambdaExecRole';
import deployment from './build.test.in/tfinjsConfig/deployment';
import build from '../index';

test('deployment', async () => {
  await build(deployment, {
    output: join(__dirname, 'build.test.out'),
  });
});
