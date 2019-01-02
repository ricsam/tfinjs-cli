/* eslint-env jest */
import { join } from 'path';
import project from './build.test.in/index';
import build from '../index';

test('project', async () => {
  await build(project, {
    output: join(__dirname, 'build.test.out'),
  });
});
