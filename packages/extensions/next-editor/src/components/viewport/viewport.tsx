import { useEffect, useRef, useState } from "react";
import { NoPanArea, Space } from "react-zoomable-ui";
import { useClickOutside } from "@lunex/utils/src";
import { useEditor } from "@lunex/state/src";
import { Icon } from "@lunex/icons/src";
import { Resolution } from "./components/resolution";
import { Rnd } from 'react-rnd';
import { ViewportRender } from "./viewport-render";
function gcd(a: number, b: number): number {
  return (b == 0) ? a : gcd(b, a % b);
}

const ViewportMenu = () => {

  const {
    // context,
    
  } = useEditor();
  const context = {
    toggleSettings: (s: string) => {},
    settings: {
      lock: false,
      gizmos: true,
    }
  }
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

export function ViewportWindowsComponent() {
  const { 
    context: editorCtx,
    name,
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

  const context = {
    settings: {
      lock: false,
      gizmos: true,
    },
    inspector: {
      setActive: (s: string) => {},
      
    }
  }

  
  const a = editorCtx.getShared('editor.components');
  if(a){
    console.log(a);
  }
  const [ size, setSize ] = useState({
    w: 1366,
    h: 768,
  });

  // const { ref: dropRef, canDrop, isOver, item } = useDraggable();
  const [ viewport, setViewport ] = useState<any>(null);
  const [ retrigger, setRetrigger ] = useState(false);
  const [ lock, setLock ] = useState(false);

  const [ viewportPosition, setViewportPosition ] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });

  // const viewportPosition = {
  //   x: 0,
  //   y: 0,
  //   zoom: 1,
  // }

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

    if(context?.settings?.lock || lock) {
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

  const [ s, setS ] = useState({
    w: size.w + 80,
    h: 40,
    x: 0,
    y: 0,
  });

  // @ts-ignore
  function onResize(a, b, ref, d, position) {
    const width = parseFloat(ref.style.width.replace('px', ''));
    const height = parseFloat(ref.style.height.replace('px', ''));
    setS({
      w: width,
      h: height,
      ...position,
    });

    setSize(i => ({
      ...i,
      w: width - 80,
    }))
  }

  return (
    <main ref={parentRef} className="flex-1 relative " style={{ background: 'url("/grid.webp")', backgroundSize: '8%' }}>
      {/* <ViewportMenu /> */}
      <div className="absolute left-0 top-0 w-screen h-screen opacity-80 bg-gray-950 backdrop-blur" ></div>
      <Resolution size={size} />

      <Space 
        onCreate={setViewport}
        onUpdated={updateViewportPosition}
        onDecideHowToHandlePress={(e) => {
        return {
          // ignorePressEntirely: context?.settings?.lock,
          ignorePressEntirely: lock,
        }
      }}>
        <NoPanArea style={{ width: '100vW', height: '100vH' }}>
          <div ref={ref} className="relative">
            { config?.globals?.css && <style>{config.globals.css}</style> }


            <div className={backgroundClass + " flex flex-col relative items-center min-h-screen"} style={{ width: size.w }}>
              <div className="absolute left-0 top-2/4 -translate-y-2/4 h-32">
                <Rnd onResizeStart={() => setLock(true) } onResize={onResize} onResizeStop={() => setLock(false)} style={{ cursor: 'initial' }} 
                  position={{ x: s.x, y: s.y }} 
                  size={{ width: s.w, height: '100%' }} dragAxis="none" enableResizing={{
                  right: true,
                  // left: true,
                }}>
                  <div className="absolute -right-1 pointer-events-none top-0 w-2 h-full bg-white/40 rounded-full z-10" />
                  {/* <div className="absolute -left-1 pointer-events-none top-0 w-2 h-full bg-white/60 rounded-full z-10" /> */}

                </Rnd>
                </div>

              <ViewportRender />
            </div>
          </div>
        </NoPanArea>
      </Space>
    </main>
  )
}