import { createPlugin } from '@lunex/plugins';

import { PanelsConfig } from './components/panels';
import { WindowsConfig } from './components/windows';
import { CommandsConfig } from './components/commands';

export const FigmaPlugin = [
  createPlugin([
    PanelsConfig,
    WindowsConfig,
    CommandsConfig
  ] as any)
]