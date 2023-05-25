#!/usr/bin/env node

import { vite } from './handlers/vite.js';
const [,, command] = process.argv


if(['dev', 'build'].includes(command)) {
  vite(command);
} else if(command === 'generate') {
  console.log('generate');
}

