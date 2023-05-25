import { usePlugins, WindowPluginConfigProps } from "@lunex/plugins";
import { ReactNode } from "react";
import { useWindow } from "../window.hooks";

interface Props {
  children?: ReactNode;
}

export function MainPanel({ children }: Props) {
  const {
    getTab,
    activeTab,
  } = useWindow();
  
  const { getConfigByType } = usePlugins();
  let Component = () => <>{children}</>
  const type = getTab(activeTab)?.type; 

  if(type) {
    const windowConfig = getConfigByType<WindowPluginConfigProps>(type, '@lunex/window');
    
    if(windowConfig?.component) {
      Component = windowConfig.component as any;
    }
  }

  return (
    <div className="flex flex-1">
      <Component />
    </div>
  )
}