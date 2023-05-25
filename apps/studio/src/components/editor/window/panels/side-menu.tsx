import { Icon } from "@editor/utils/icons";
import { ComponentView, HierarchyView } from "./hierarchy";
import { useState } from "react";
import { useEditor } from "@editor/state";

export const SideMenu = ({
  toggleSettings,
  open = false,
  hideSidebar = false,
}: any) => {
  const { state, pageEditor } = useEditor();
  const [ showComponents, setShowComponent ] = useState(false);

  function toggle() {
    setShowComponent(!showComponents);
  }

  function handleSelect(it: any) {
    pageEditor.createNode(it, state.selection);
    setShowComponent(false);
  }

  return !hideSidebar ? (
    <aside className={"left-0 top-0 text-white absolute bg-gray-900 z-50 flex select-none"} style={{ 
      height: 'calc(100% - 54px)', 
      top: 54,
      boxShadow: '0 3px 24px 0 rgba(0,0,0, 0.5)',
    }}>
      <ul className="p-3">
        <li className="relative group/option p-2 bg-gray-700 hover:bg-gray-500 text-white cursor-pointer flex justify-center items-center rounded-sm" onClick={() => toggleSettings("structure")}>
          <Icon name="StructureIcon" size={5} />
          <div 
            style={{ minWidth: 120, left: 'calc(100% + 8px)'}} 
            role="tooltip" 
            className="group-hover/option:visible group-hover/option:opacity-100 invisible opacity-0 translate-y-2/4 absolute z-50 visible flex text-center justify-center px-3 py-2 text-xs font-medium text-white transition-opacity duration-300 bg-gray-700 rounded-lg shadow-sm dark:bg-gray-500/40"
          >
            View Structure
          </div>
        </li>
      </ul>
      { open && (
        <div className="w-80 flex flex-col border-l border-gray-700">
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
      ) }
    </aside>
  ) : null
}