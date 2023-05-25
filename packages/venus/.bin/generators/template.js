import fs from 'fs';
import * as path from 'path';

import { packagesDir, rootDir } from './utils.js';

export const fileTemplateFolder = `${rootDir}/packages/venus/.bin/generators/customMaps/templates`;

export function copyCustomTemplate(file, cb) {
  let data = fs.readFileSync(`${fileTemplateFolder}/${file}`, 'utf8');

  data = cb(data);
  // fs.writeFileSync(file, data, 'utf8');
  return data;
}

export function createFromTemplate(fileDest, fileTemplate, templateInfo) {
  const template = copyCustomTemplate(fileTemplate, (data) => {
    return data.replace(/{{(.*?)}}/g, (_, key) => templateInfo[key.trim()]);
  });

  const folder = path.dirname(fileDest);

  if(!fs.existsSync(folder)) {
    console.log("HERE", folder);
    fs.mkdirSync(folder, { recursive: true });
  }

  console.log("SAVING INTO "+fileDest);

  fs.writeFileSync(fileDest, template, 'utf8');
}

export function replaceFromTemplate(fileTemplate, templateInfo) {
  return copyCustomTemplate(fileTemplate, (data) => {
    return data.replace(/{{(.*?)}}/g, (_, key) => templateInfo[key.trim()]);
  });
}