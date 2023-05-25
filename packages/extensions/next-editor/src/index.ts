import { createPlugin } from '@lunex/plugins';
import { Windows } from './window';
import { Panels } from './panel';
import { Commands } from './command';

export const NextEditorPlugin = [
  createPlugin([
    ...Windows,
    ...Panels,
    ...Commands,
  ])
]