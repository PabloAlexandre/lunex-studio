'use client';

import { Command } from "cmdk";
import { Icon } from "@editor/icons";
import { useShortcut } from "@editor/utils/shortcuts";
import groupBy from "lodash/groupBy";
import { useEditor } from "@editor/state";
import { CreateBaseCommandProps, useRegister } from "@editor/register";
import { ListPanel } from "./panels/list.panel";
import { PreviewPanel } from "./panels/preview.panel";
import { useState } from "react";


export function Finder() {
  const [ value, setValue ] = useState('');
  const [ open, setOpen ] = useState(false);
  
  const {
    context,
    eventHandler,
  } = useEditor();
  const register = useRegister();
  useShortcut('k', () => {
    setOpen(isOpen => !isOpen);
  });

  useShortcut('Escape', () => {
    if(open) {
      setOpen(false);
    }
  }, false, [ open ]);

  function onSelect(id: string) {
    const item: any = value && register.get('commands', id, (it: any) => it.id === value)

    if(item?.handler) {
      eventHandler(item.handler);
    }

    setOpen(false);
  }


  const items = groupBy(
    (register.get('commands') as CreateBaseCommandProps[])
      .filter((it: CreateBaseCommandProps) => it.isVisible(context))
      .sort((a: CreateBaseCommandProps, b: CreateBaseCommandProps) => b.priority(context) - a.priority(context))
  , 'category');

  const item: any = value && register.get<CreateBaseCommandProps>('commands', value, (it) => it.id === value)
  
  return (
    <div className="framer">
      
      { open && <div className="fixed left-0 top-0 w-screen h-screen backdrop-blur-sm" style={{zIndex: 1400 }}/> }
      { open && <div className="fixed left-0 top-0 w-screen h-screen bg-black opacity-70" style={{zIndex: 1500 }}/> }
      <Command.Dialog value={value} open={open} onValueChange={setValue} className="absolute w-5/12 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 bg-white" style={{ zIndex: 2000, maxHeight: 400 }}>
        <div cmdk-framer-header="" className="border-b border-gray-300">
          <Icon name="SearchIcon" size={5} className="opacity-50" />
          <Command.Input className="ring-transparent" autoFocus placeholder="Find components, packages, and interactions..." />
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