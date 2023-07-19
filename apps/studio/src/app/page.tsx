'use client';

import { Editor, useWindow } from "@lunex/editor/src";


function Page() {
  const {
    createTab,
    // closeAll,
  } = useWindow();

  function createWindow(props = {}) {
    return () => createTab({
      title: 'New tab',
      id: '121345',
      icon: 'EyeIcon',
      type: "view",
      canClose: true,
      isEditable: false,
      info: {},
      ...props
    })
  }

  return (
    <div className="flex items-center justify-center flex w-full h-screen dark:bg-gray-700">
      <button onClick={createWindow({ icon: "FrameIcon", title: "Fixed Window", canClose: false })} className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded mr-4">Fixed window</button>
      <button onClick={createWindow({ icon: "StructureIcon", title: "Closable Window"})} className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mr-4">Closable window</button>
      <button onClick={createWindow({ icon: "CodeIcon", isEditable: true, title: "Editable Window" })} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mr-4">Editable window</button>

      <button onClick={createWindow({ icon: "PageIcon", isEditable: true, canClose: false, title: "Viewport", type: 'viewport' })} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mr-4">Viewport</button>
      <button onClick={createWindow({ icon: "FigmaIcon", isEditable: true, canClose: true, title: "Figma", type: 'figma' })} className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded mr-4">Figma</button>

      {/* <button onClick={() => closeAll()} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-4">Close All</button> */}

    </div>
  )
}

export default function StudioPage() {
  return (
    <Editor>
      <Page />
    </Editor>
  )
}