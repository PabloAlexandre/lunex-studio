
interface WindowPlugin {
  title: string;
  icon: string;
  component: string;
  width: number;
  height: number;
}

interface CommandPlugin {
  title: string;
}

interface InspectorPlugin {
  title: string;
}

interface PluginConfig {
  id: string;
  window: WindowPlugin;
  command: CommandPlugin;
  inspector: InspectorPlugin;
}

export function createPlugin(name: string, id: string, configs: PluginConfig) {

}