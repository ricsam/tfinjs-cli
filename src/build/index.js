import assert from 'assert';
import { resolve } from 'path';
import { Deployment } from 'tfinjs';
import { hclPrettify } from 'tfinjs/utils';
import {
  mkdirpSync,
  ensureDirSync,
  writeFileSync,
  readFileSync,
} from 'fs-extra';

const build = async (deployment, { output }) => {
  assert(
    deployment instanceof Deployment,
    'deployment must be an instance of Deployment',
  );
  assert(typeof output === 'string', 'output must be string');
  const resources = deployment.getResources();
  const newHistory = resources.reduce((map, resource) => {
    const uri = resource.getUri();
    const name = resource.versionedName();
    return {
      ...map,
      [name]: uri,
    };
  }, {});

  mkdirpSync(output);

  const historyFilePath = resolve(output, 'history.json');

  let currentHistory = {};
  try {
    currentHistory = JSON.parse(readFileSync(historyFilePath));
  } catch (err) {
    /* do nothing */
  }

  writeFileSync(
    historyFilePath,
    JSON.stringify(
      {
        ...currentHistory,
        ...newHistory,
      },
      null,
      2,
    ),
  );

  await Promise.all(
    resources.map(async (resource) => {
      const name = resource.versionedName();

      const distFolder = resolve(output, name);
      ensureDirSync(distFolder);

      const hcl = resource.getHcl();

      const prettyHcl = await hclPrettify(hcl);

      writeFileSync(resolve(distFolder, 'main.tf'), prettyHcl);
    }),
  );
};

export default build;
