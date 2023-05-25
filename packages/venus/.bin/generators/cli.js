#!/usr/bin/env node

import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';

import { delay } from './utils.js';

async function ask(field) {
  let answer = {};
  
  do {
    answer = await inquirer.prompt({
      type: 'input',
      name: field.name,
      message: field.message,
      ...field,
    })

  } while(!answer[field.name] && field.required);

  return answer;
}

const typeMapper = {
  'customMap': async (field, response, cli) => {
    const res = await ask({
      ...field,
      type: 'list'
    });

    const option = cli.customMap[res[field.name]];

    response[field.name] = res[field.name];
    response.customMap = await run(option);
  },
  'boolean': async (field, response) => {
    const askField = {
      name: 'boolean',
      default: field.defaultValue ? 'Yes' : 'No',
      type: 'list',
      message: field.message,
      choices: ['Yes', 'No'],
    }

    const res = await ask(askField);

    response[field.name] = res.boolean === 'Yes';
  },
  'repetable': async (field, response) => {
    const askField = {
      name: 'repetable',
      type: 'list',
      message: field.message,
      default: 'No',
      choices: ['Yes', 'No'],
    }

    let res = await ask(askField);

    if(res.repetable === 'No') return;

    askField.message = field.ask;
    response[field.name] = [];
    
    do {
      const newCli = {
        fields: [...field.fields],
      };

      const resFields = await run(newCli);
      response[field.name].push(resFields);


      console.log('\nItem added! \n');
    } while((await ask(askField)).repetable === 'Yes')
  }
}

async function run(cli) {
  let field;
  const response = {};

  while(field = cli?.fields.shift()) {
    if(typeMapper[field.type]) {
      await typeMapper[field.type](field, response, cli);
      continue;
    }

    const res = await ask(field);
    response[field.name] = res[field.name];
  }

  return response;
}

export async function runCLI(cli) {
  const title = chalkAnimation.rainbow('Venus Generator\n');
  await delay(700);
  title.stop();

  const response = await run(cli);

  return response;
}

export async function createPackageCLI(name, handler) {
  const spinner = createSpinner('Creating package...');
  spinner.start();

  await handler();

  await delay(500);
  spinner.stop();

  console.log(gradient.instagram(`\nPackage ${name} created successfully!\n\n`));
  console.log(`${chalk.bold('To start developing run:')} ${chalk.green('rush update')} ${chalk.bold('and')} ${chalk.green('rush build')}\n\n`);
}