import assert from 'assert';
import { resolve } from 'path';
import { Deployment } from 'tfinjs';
import { ensureDirSync, writeFileSync } from 'fs-extra';

const build = (deployment, { output }) => {
  assert(deployment instanceof Deployment, 'deployment must be an instance of Deployment');
  assert(typeof output === 'string', 'output must be string');
  const resources = deployment.getResources();
  resources.forEach((resource) => {
    const name = resource.versionedName();

    const distFolder = resolve(output, name);
    ensureDirSync(distFolder);

    const hcl = resource.getHcl();

    writeFileSync(resolve(distFolder, 'main.tf'), hcl);
  });
};

export default build;
