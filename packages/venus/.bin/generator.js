#!/usr/bin/env node

import { NewExtesion } from './generators/customMaps/extension.js';
import { NewLib } from './generators/customMaps/lib.js';
import { runCLI } from './generators/cli.js';

const customMap = {
  library: NewLib,
  extension: NewExtesion,
}
const defaultCLI = {
  fields: [{
    name: 'name',
    message: 'What is the package name?',
    required: true,    
  }, {
    name: 'description',
    message: 'What is the description of package?',
    required: true,    
  }, {
    name: 'type',
    type: 'customMap',
    message: 'What is the type of package do you wanna to generate?',
    choices: [ 'library', 'extension' ],
  }],
  customMap,
}

export async function run() {
  const response = await runCLI(defaultCLI);

  const type = response.type;

  if(!type) return;
  await customMap[type].generate(response);
}

run();