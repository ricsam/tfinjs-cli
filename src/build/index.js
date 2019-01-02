import assert from 'assert';
import { resolve } from 'path';
import { Project } from '@tfinjs/api';
import { hclPrettify } from '@tfinjs/api/utils';
import {
  mkdirpSync,
  ensureDirSync,
  writeFileSync,
  readFileSync,
} from 'fs-extra';

const build = async (project, { output }) => {
  assert(
    project instanceof Project,
    'project must be an instance of Project',
  );
  assert(typeof output === 'string', 'output must be string');
  const resources = project.getResources();
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
