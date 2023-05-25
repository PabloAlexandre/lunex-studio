'use client';

import { Command } from "cmdk";
import { Icon } from "@lunex/icons";
import { groupBy, useHotkeys } from "@lunex/utils";
import { useEditor } from "@lunex/state";
import { ListPanel } from "./panels/list.panel";
import { PreviewPanel } from "./panels/preview.panel";
import { useState } from "react";
import { CommandPluginConfigProps, usePlugins } from "@lunex/plugins";

export function Finder() {
  const [ value, setValue ] = useState('');
  const [ open, setOpen ] = useState(false);
  const { getConfigs } = usePlugins();

  const commands = getConfigs<CommandPluginConfigProps>('@lunex/commands');
  console.log(commands);
  
  const {
    context,
    eventHandler,
  } = useEditor();

  useHotkeys('k + meta', () => {
    setOpen(isOpen => !isOpen);
  });

  useHotkeys('escape', () => {
    setOpen(isOpen => !isOpen);
  });
  

  function onSelect(id: string) {
    const item: CommandPluginConfigProps | undefined = value ? commands.find((it: any) => it.id === id) : undefined

    if(item?.handler) {
      eventHandler(item.handler);
    }

    setOpen(false);
  }

  const items = groupBy(
      commands
      .filter((it: CommandPluginConfigProps) => it.isVisible(context))
      .sort((a: CommandPluginConfigProps, b: CommandPluginConfigProps) => b.priority(context) - a.priority(context))
  , 'category');

  const item: any = value && commands.find((it: any) => it.id === value)
  
  return (
    <div className="framer">
      { open && <div className="fixed left-0 top-0 w-screen h-screen backdrop-blur-sm" style={{zIndex: 1400 }}/> }
      { open && <div className="fixed left-0 top-0 w-screen h-screen bg-black opacity-70" style={{zIndex: 1500 }}/> }
      <Command.Dialog value={value} open={open} onValueChange={setValue} className="absolute w-5/12 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 bg-white" style={{ zIndex: 2000, maxHeight: 400 }}>
        <div cmdk-framer-header="" className="border-b border-gray-300">
          <Icon name="SearchIcon" size={5} className="opacity-50" />
          <Command.Input className="ring-transparent" autoFocus={false} placeholder="Find components, packages, and interactions..." />
        </div>

        <Command.List className="mb-8">
          {/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}

          <div cmdk-framer-items="">
            <div cmdk-framer-left="">
              <Command.Empty>No results found.</Command.Empty>
              {
                items && Object.entries(items).map(([k, v]: any) => (
                  <ListPanel key={v.id} value={value} title={k} items={v} onSelect={onSelect} />
                ))
              }
            </div>
        
            <div cmdk-framer-separator="" />

            { item && (
              <PreviewPanel title={item.title} subtitle={item.subtitle} category={item.category}>
                <Icon name={item.icon} size={8} />
              </PreviewPanel> 
            )}
          </div>
        </Command.List>
      </Command.Dialog>
    </div>
  )
}