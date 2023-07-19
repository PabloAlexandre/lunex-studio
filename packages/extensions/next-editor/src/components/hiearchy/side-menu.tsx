import { Icon } from "@lunex/icons/src";
import { useState } from "react";

import { ComponentView, HierarchyView } from "./hierarchy";

export const SideMenu = ({

}: any) => {
  // const { state, pageEditor } = useEditor();
  const [ showComponents, setShowComponent ] = useState(false);

  function toggle() {
    setShowComponent(!showComponents);
  }

  function handleSelect(it: any) {
    // pageEditor.createNode(it, state.selection);
    setShowComponent(false);
  }

  return (
    <div className="w-full flex flex-col">
      { showComponents && <ComponentView onClose={() => setShowComponent(false)} onSelect={handleSelect} /> }
      <header className="border-b border-rose-300 h-12 w-full p-3 px-4 flex justify-between items-center">
        <span>Elements</span>
        <button className="bg-indigo-500 hover:bg-indigo-400 rounded-sm p-2 text-xs text-white flex items-center space-between" onClick={toggle}>
          <Icon name="ComponentIcon" size={3} className="mr-1" />
          Add new
        </button>
      </header>
      <main className="w-full h-full">
        <HierarchyView />
      </main>
    </div>
  )
}