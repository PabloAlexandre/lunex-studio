import { createContext, useContext, useState } from "react";
import { useRegister } from "@editor/register";
import { useEditor } from "@editor/state";
import { SideMenu } from "./panels";

interface WindowProps {
  children?: React.ReactNode;
}

interface WindowContextProps {
  windows: any[],
  currentWindow: any,
  addWindow: (window: any) => void,
}

const WindowContext = createContext<WindowContextProps>({
  windows: [],
  currentWindow: {},
  addWindow: () => {},
});

export function useWindow() {
  const window = useContext(WindowContext);
  return window;
}

export function Window({ children }: WindowProps){
  const register = useRegister();
  const {
    context,
    state: {
      window: {
        windows,
        opened: currentWindow,
      }
    },
  } = useEditor();

  const [ editing, setEditing ] = useState<any>(null);

  function addWindow(newWindow: any) {
    // setWindows([ ...windows, newWindow ]);
  }

  function openWindow(newWindow: any) {
    context.window.openWindow(newWindow);
  }

  // console.log({ editorInfo });

  // const SelectedItem = EDITOR_WINDOW_MAP[currentWindow.id as keyof typeof EDITOR_WINDOW_MAP] as any;
  const SelectedItem = (register.get('windows') as any).find((it: any) => it.id === currentWindow)?.component || (() => <>Empty</>);
  
  return (
    <WindowContext.Provider value={{ addWindow, windows, currentWindow }}>
      <div className="relative flex w-full h-full ">
      <SideMenu toggleSettings={context.toggleSettings} open={context.settings.structure && currentWindow === 'viewport'} hideSidebar={currentWindow !== 'viewport'} />
        <ul className="z-50 border-b border-gray-500 dark:bg-gray-900 fixed overflow-hidden left-0 top-0 w-screen flex flex-wrap text-sm font-medium text-center text-gray-500">
          {
            windows.map((windowId: string) => {
              const item = register.get('windows', windowId) as any;

              const className = item.id === currentWindow ? 'bg-gray-100/90 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 dark:hover:text-white dark:bg-transparent dark:text-white border-t border-x border-x-gray-900 dark:border-t dark:border-t-rose-300' : '';
              const editableClass = editing === item.id ? 'outline-1' : '';

              
              return (
                <li className="mr-2 " key={item.id} onClick={() => openWindow(item.id)}>
                  <a onDoubleClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();

                    function selectElementContents(el: any) {
                        var range = document.createRange();
                        range.selectNodeContents(el);
                        var sel = window.getSelection();

                        if(!sel) return;

                        sel.removeAllRanges();
                        sel.addRange(range);
                    }

                    setEditing(item.id);

                    function handleClickOutside(event: any) {
                      if (e.target && !e.target.contains(event.target)) {
                        setEditing('')
                        e.target.blur();
                      }
                    }
                
                    document.addEventListener("mousedown", handleClickOutside);
                    selectElementContents(e.target);
                  }} contentEditable={editing === item.id} href="#" className={ className + " drop-shadow-2xl inline-block p-4 px-6"+editableClass}
                    style={{
                      boxShadow: item.id === currentWindow ? '0 3px 24px 0 rgba(0,0,0, 0.5)' : 'none'
                    }}
                  >{ item.title }</a>
                </li>
              ) 
            })
          }
      </ul>
      <div className="flex h-full w-full mt-12">
        <SelectedItem />
      </div>
      </div>
    </WindowContext.Provider>
  )
}