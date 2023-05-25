import { ReactNode } from "react";
import { MainPanel } from "./components/main-panel";
import { SidePanel } from "./components/side-panel";
import { Tabs } from "./components/tabs";
import { WindowContext, useInternalWindow } from "./window.context";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface Props { 
  children?: ReactNode;
}
export function Window({ children }: Props) {
  const window = useInternalWindow();
  return (
    <DndProvider backend={HTML5Backend}>
      <WindowContext.Provider value={window}>
        <main className="flex flex-col w-full h-full">
          {/* IMPLEMENT TOOLBAR IN FUTURE */}

          <main className="flex flex-1 flex-col w-full">
            <Tabs />
            <main className="flex w-full h-full border-y border-gray-300 dark:border-gray-700 items-stretch" style={{height: 'calc(100vH - 48px)'}}>
              <SidePanel />
              <MainPanel>
                {children}
              </MainPanel>
              <SidePanel orientation="right" />
            </main>
          </main>

          {/* IMPLEMENT BOTTOM IN FUTURE */}
        </main>
      </WindowContext.Provider>
    </DndProvider>
  );
}
