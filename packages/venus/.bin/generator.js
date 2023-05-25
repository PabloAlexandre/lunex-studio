#!/usr/bin/env node

import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
import rushLib from '@microsoft/rush-lib';
import child_process from 'child_process';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function ask(id, message, payload = {}) {
  let answer = {};

  while(!answer[id]) {
    answer = await inquirer.prompt({
      type: 'input',
      name: id,
      required: true,
      message,
      ...payload,
    })
  }

  return answer;
}


function copyFolderRecursive(folder, targetFolder) {
  if(!fs.lstatSync(folder).isDirectory()) return;

  const files = fs.readdirSync(folder);
  files.forEach((file) => {
    const curSource = `${folder}/${file}`;
    const curTarget = `${targetFolder}/${file}`;

    if(fs.lstatSync(curSource).isDirectory()) {
      fs.mkdirSync(curTarget);
      copyFolderRecursive(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  });
}

async function createProject(info) {
  const spinner = createSpinner('Creating package...');
  spinner.start();

  const templateMap = {
    'React Component': 'react-component',
  }

  if(!templateMap[info.template]) throw new Error('Template not found');

  const rushConfiguration = rushLib.RushConfiguration.loadFromDefaultLocation({
    startingFolder: process.cwd()
  });

  const { rushJsonFile: rushConfigPath, rushJsonFolder: rootDir } = rushConfiguration;

  const outputDir = `${rootDir}/packages/${info.type}/${info.name}`;
  const templateFolder = `${rootDir}/packages/venus/templates/${templateMap[info.template]}`;

  if(fs.existsSync(outputDir)) throw new Error('Package already exists');
  
  
  fs.mkdirSync(outputDir, { recursive: true });
  copyFolderRecursive(templateFolder, outputDir);

  const packageName = info.type === 'core' ? `@lunex/${info.name}` : `@lunex-extensions/${info.name}`;

  // REPLACE PACKAGE DATA

  let data = fs.readFileSync(`${outputDir}/package.json`, 'utf8');

  data = data.replace("{{packageName}}", packageName);
  data = data.replace("{{description}}", info.description);
  fs.writeFileSync(`${outputDir}/package.json`, data, 'utf8');

  // ADD PROJECT TO RUSH

  const rush = fs.readFileSync(rushConfigPath, 'utf8');
  const rushData = JSON.parse(rush);

  const packageFolder = `packages/${info.type}/${info.name}`;

  rushData.projects.push({
    packageName: packageName,
    projectFolder: packageFolder,
    tags: [ `${info.type}/${info.name}` ],
  });

  fs.writeFileSync(rushConfigPath, JSON.stringify(rushData, null, 2), 'utf8');
  
  await delay(500);
  spinner.stop();

  console.log(gradient.instagram(`\nPackage ${info.name} created successfully!\n\n`));
  console.log(`${chalk.bold('To start developing run:')} ${chalk.green('rush update')} ${chalk.bold('and')} ${chalk.green('rush build')}\n\n`);

  process.exit(0);
  
}

export async function generate() {
  const title = chalkAnimation.rainbow('Venus Generator\n');
  await delay(700);
  title.stop();

  const { name } = await ask('name', 'What is the package name?')
  const { description } = await ask('description', 'What is the description of package?')

  const { type } = await ask('type', 'What is the type of package do you wanna to generate?', {
    type: 'list',
    choices: [ 'extensions', 'core'],
  })

  const { template } = await ask('template', 'What kind of lib do you wanna to generate?', {
    type: 'list',
    choices: [ 'React Component'],
  })

  await createProject({
    name,
    description,
    type,
    template,
  });
}

generate();