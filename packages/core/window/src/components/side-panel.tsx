import { useState } from "react";
import { Icon } from "@lunex/icons";
import { PanelPluginConfigProps, usePlugins } from "@lunex/plugins";


function ItemPanel({
  onClick,
  icon,
  active,
}: any){
  const className = active ? 'dark:bg-white/40 dark:hover:bg-white/50' : 'dark:bg-white/10 dark:hover:bg-white/20';
  return (
    <span onClick={onClick} className={className + " flex items-center justify-center rounded-sm p-2 mb-2 cursor-pointer uppercase font-bold text-gray-300"}>
      <Icon color="white" name={icon} size={5} className="opacity-90"/>
    </span>
  )
}

export function SidePanel({
  orientation = 'left'
}: any) {
  const [ active, setActive ] = useState("");
  const { getConfigs } = usePlugins();

  const panels = getConfigs<PanelPluginConfigProps>("@lunex/panel")
    .filter(it => it.panelSide === orientation && it.isVisible());
    
  const className = active ? 'w-96' : '';
  const activePanel = active && panels.find(it => it.id === active);

  const commands = getConfigs<any>('@lunex/commands');
  console.log(commands);


  console.log({ activePanel });

  const menus = (
    <div className="h-full">

    {
      panels.length ? (
        panels.map((panel, index) => (
          <div className="flex flex-col px-2 py-4">
            <ItemPanel key={index}  onClick={() => setActive(panel.id === active ? '' : panel.id)} icon={panel.icon} active={active === panel.id} />
          </div>
        ))
      ) : null
    }
    </div>
  )


  const content = activePanel && (
    <div className={(orientation === 'left' ? 'border-l border-violet-400/30': 'border-r border-green-400/30') + " flex flex-col flex-1 p-4 dark:text-gray-200"}>
      <activePanel.component />
    </div>
  )
  
  const components = orientation === 'left' ? [menus, content] : [content, menus];


  return (
    <div className={className + "  select-none flex h-full justify-center bg-gray-200 dark:bg-gray-800 z-10"} style={{ boxShadow: '0 3px 24px 0 rgba(0,0,0, 0.5)' }}>
      {
        components
      }
    </div>
  )
}