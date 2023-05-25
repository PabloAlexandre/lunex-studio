import { PluginConfigs } from "../plugins.context";

export function createPlugin(configs: PluginConfigs[]) {
  class Plugin {
    constructor(public readonly configs: PluginConfigs[]) {}
  }

  return new Plugin(configs);
}