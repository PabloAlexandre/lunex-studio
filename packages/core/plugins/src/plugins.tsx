import { Plugin, PluginsContext, useInternalPlugins } from "./plugins.context";

interface PluginsProps {
  initialPlugins?: Plugin[];
  children: React.ReactNode;
}

export function Plugins({ children, initialPlugins = [] }: PluginsProps) {
  const plugins = useInternalPlugins(initialPlugins);

  return (
    <PluginsContext.Provider value={plugins}>
      { children }
    </PluginsContext.Provider>
  )
}