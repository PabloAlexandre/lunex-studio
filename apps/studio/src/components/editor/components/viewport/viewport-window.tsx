'use client';

import { NoPanArea, Space } from "react-zoomable-ui";
import { useClickOutside } from "@editor/hooks";

import { useEffect, useRef, useState } from "react";
import { useEditor } from "@editor/state";
import { Icon } from "@editor/icons";
import { createWindow } from "@editor/window";

function gcd(a: number, b: number): number {
  return (b == 0) ? a : gcd(b, a % b);
}

const ViewportMenu = () => {
    const {
      context,
    } = useEditor();

  return (
    <div className="absolute right-0 -translate-x-2/4 top-8 flex items-center" style={{ zIndex: 1000}}>
      <div onClick={() => context.toggleSettings('lock')} className={ (context.settings.lock ? 'text-gray-300' : 'text-gray-500') + " mr-4 drop-shadow-xl rounded-full cursor-pointer hover:bg-gray-100 bg-white h-8 w-8 items-center justify-center flex"}>
        { context.settings.lock ? <Icon name="LockIcon" className="text-red-300" size={4} /> : <Icon name="UnlockIcon" className="text-green-300" size={4} /> }
      </div>
      <div onClick={() => context.toggleSettings('gizmos')} className={ (context.settings.gizmos ? 'text-gray-500' : 'text-gray-300') + " drop-shadow-xl rounded-full cursor-pointer hover:bg-gray-100 bg-white h-8 w-8 items-center justify-center flex"}>
        { context.settings.gizmos ? <Icon name="EyeIcon" className="text-blue-400" size={4} /> : <Icon name="EyeClosedIcon" size={4} /> }
      </div>
    </div>
  )
}

export function ViewportWindowImpl() {
  const { 
    context,
    pageEditor: {
      items,
    },
   } = useEditor();

  const config = {
    resolution: {
      w: 1920,
      h: 1080,
    },
    globals: {
      css: '',
    }
  }

  // const { ref: dropRef, canDrop, isOver, item } = useDraggable();
  const [ viewport, setViewport ] = useState<any>(null);
  const [ retrigger, setRetrigger ] = useState(false);

  const [ viewportPosition, setViewportPosition ] = context.serializeField('editor.viewport', {
    x: 0,
    y: 0,
    zoom: 1,
  });

  const parentRef = useRef<HTMLDivElement>(null);

  const ref = useClickOutside(() => {
    context.inspector.setActive('settings');
  }, null, parentRef);

  // const isActive = canDrop && isOver
  const isActive = false;
  const backgroundClass = isActive ? 'bg-green-50' : 'bg-white'

  var r = gcd(config.resolution.w, config.resolution.h);

  function updateViewportPosition(details: any) {
    if(retrigger) {

      setRetrigger(false)
      return;
    }

    if(context?.settings?.lock) {
      setRetrigger(true);
      setTimeout(() => viewport.camera.recenter(viewportPosition.x, viewportPosition.y, viewportPosition.zoom), 0);
      return;
    };

    const x = Math.round(details.centerX);
    const y = Math.round(details.centerY);

    setViewportPosition({
      x,
      y,
      zoom: details.zoomFactor,
    })

    // viewport.setBounds({ x: [details.zoomFactor, x || 0], y: [details.zoomFactor, y || 0] });
  }

  useEffect(() => {
    if(viewport) {
      viewport.camera.recenter(viewportPosition.x, viewportPosition.y, viewportPosition.zoom);
    }
  }, [viewport]);


  return (
    <main ref={parentRef} className="flex-1 relative " style={{ background: 'url("/grid.webp")', backgroundSize: '8%' }}>
      <ViewportMenu />
      <div className="absolute left-0 top-0 w-full h-full opacity-80 bg-gray-950 backdrop-blur" ></div>
      <Space 
        onCreate={setViewport}
        onUpdated={updateViewportPosition}
        onDecideHowToHandlePress={(e) => {
        return {
          ignorePressEntirely: context?.settings?.lock,
        }
      }}>
        <NoPanArea style={{ width: '100%', height: '100%' }}>
          <div ref={ref} className="relative">
            { config?.globals?.css && <style>{config.globals.css}</style> }

            <div className="absolute -top-16 text-4xl right-0 p-2 text-white">{config.resolution.w}x{config.resolution.h} | {config.resolution.w / r}/{config.resolution.h / r}</div>
            <div className={backgroundClass + " flex flex-col h-screen relative items-center justify-center"}>
              <h1 className="font-extralight text-6xl text-gray-400">Hello from charles</h1>
              {/* {
                items.length ? items.map(
                  (it: any) => <it.gizmos key={''} props={{ item: it }} />
                ) : (
                  <div className="p-32 text-center ">
                    <h1 className="text-6xl font-extralight mb-8">Your empty page</h1>
                    <p className="text-2xl opacity-50 font-extralight">
                      {isActive ? `Release ${item?.name} to drop` : 'Drag a box here'}
                    </p>
                  </div>
                )
              } */}
            </div>
          </div>
        </NoPanArea>
      </Space>
    </main>
  )
}

export const ViewportWindow = createWindow({
  id: 'viewport',
  title: 'Viewport',
  attached: true,
  component: ViewportWindowImpl,
});