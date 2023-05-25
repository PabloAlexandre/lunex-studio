import { useContext } from "react";
import { PluginsContext } from "./plugins.context";

export function usePlugins() {
  const val = useContext(PluginsContext);

  if(!val) {
    throw new Error('usePlugins must be used within a PluginsProvider');
  }

  return val;
}