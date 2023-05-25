import { createContext, useState } from "react";
import { CommandPluginConfigProps, WindowPluginConfigProps, PanelPluginConfigProps, WindowPluginConfig, CommandPluginConfig, BasePanelConfig } from "./providers";
import { PLUGIN_COMMANDS_ID, PLUGIN_WINDOW_ID,  PLUGIN_PANEL_ID} from "./plugins.constants";


type Identifiers = typeof PLUGIN_COMMANDS_ID | typeof PLUGIN_WINDOW_ID | typeof PLUGIN_PANEL_ID;
export interface BaseConfig<T> {
  readonly identifier: Identifiers;
  readonly properties: T;
}

export type PluginsBaseConfig = CommandPluginConfig | WindowPluginConfig | BasePanelConfig;
export type PluginConfigs = CommandPluginConfigProps | WindowPluginConfigProps | PanelPluginConfigProps

export interface Plugin {
  name: string,
  configs: PluginsBaseConfig[];
}

export interface PluginsContextValue {
  plugins: Plugin[];
  addPlugin: (plugin: Plugin) => void;
  removePlugin: (plugin: Plugin) => void;
  getConfigs: <T extends PluginConfigs>(identifier: Identifiers) => T[];
  getConfigByType: <T extends PluginConfigs>(type: string, identifier: Identifiers) => T | undefined;
}

export const PluginsContext = createContext<PluginsContextValue>(null!);

export function useInternalPlugins(initialPlugins: Plugin[]) {
  const [ plugins, setPlugins ] = useState<Plugin[]>(initialPlugins);

  function addPlugin(plugin: Plugin) {
    setPlugins((oldPlugins: Plugin[]) => [...oldPlugins, plugin]);
  }

  function removePlugin(plugin: Plugin) {
    setPlugins((oldPlugins: Plugin[]) => oldPlugins.filter((p) => p !== plugin));
  }

  function getConfigs<T>(identifier: Identifiers): T[] {
    return plugins
      .filter(it => it.configs.find(cfg => cfg.identifier === identifier))
      .flatMap(it => it.configs)
      .filter(it => it.identifier === identifier)
      .map(it => it.properties) as T[]
  }

  function getConfigByType<T extends PluginConfigs>(type: string, identifier: Identifiers): T | undefined {
    const configPlugins = getConfigs<PluginConfigs>(identifier);

    if(!configPlugins.length) return undefined;

    return configPlugins
      .find(it => it.type === type) as T;
  }

  return {
    plugins,
    addPlugin,
    removePlugin,
    getConfigs,
    getConfigByType,
  }
}