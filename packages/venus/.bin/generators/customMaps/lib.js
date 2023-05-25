import { createPackage } from '../utils.js';
import { createPackageCLI } from '../cli.js';

async function createProject(info) {
  const handler = async () => createPackage(info, 'react');
  await createPackageCLI(info.name, handler)
  process.exit(0);
}

export const NewLib = {
  generate: createProject,
  fields: [{
    name: 'libType',
    type: 'list',
    message: 'What kind of lib do you wanna to generate?',
    choices: [ 'extensions', 'core' ],
  }]
}