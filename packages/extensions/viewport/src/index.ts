import { createPlugin } from '@lunex/plugins';
import { ViewportWindow } from './viewport-window';
import { ViewportCommands } from './viewport-commands';
import { ViewportPanels } from './viewport-panels';

export const ViewportPlugin = createPlugin([
  ViewportWindow,
  ...ViewportCommands,
  ...ViewportPanels,
]);