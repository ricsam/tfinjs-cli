
/* eslint-env jest */
import { join } from 'path';
import deployment from './cli.test.in/deployment';
import build from '../index';

test('deployment', () => {
  build(deployment, {
    output: join(__dirname, 'cli.test.out'),
  });
});
