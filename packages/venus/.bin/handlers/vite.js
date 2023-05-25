import fs from 'node:fs';
import { build } from 'vite';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

export const vite = (command) => {
  const PROJECT_ROOT = process.cwd();
  const packageJSON = JSON.parse(fs.readFileSync(`${PROJECT_ROOT}/package.json`, 'utf8'));

  const VITE_CONFIG = {
    plugins: [
      react(),
      tsConfigPaths({
        root: `${PROJECT_ROOT}/src`,
      }),
      dts({
        include: [`${PROJECT_ROOT}/src`],
      }),
    ],
    build: {
      outDir: `${PROJECT_ROOT}/dist`,
      lib: {
        entry: resolve(`${PROJECT_ROOT}/src`, 'index.ts'),
        name: 'Lib',
        formats: ['es', 'umd'],
        fileName: (format) => {
          const mapper = {
            es: packageJSON.module.split('./dist/')[1],
            umd: packageJSON.main.split('./dist/')[1],
          }
          
          return `${mapper[format]}`
        }
      },
      rollupOptions: {
        external: [...Object.keys(packageJSON.peerDependencies)],
      },
    },
  }
  
  
  if(command === 'dev') {
    VITE_CONFIG.build.watch = {
      buildDelay: 100,
    };
  }
  
  if(command === 'build' || command === 'dev') {
    build(VITE_CONFIG);
  }
  
}


