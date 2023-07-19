import { useEditor } from "@lunex/state/src";


const ComponentMap = {
  'grid': () => (
    <div className="grid grid-cols-3 w-full h-64 hover:border-red-500 hover:border-8 relative">
      <div className="flex items-center justify-center shadow-2xl drop-shadow-2xl	 text-white opacity-80 w-full h-full text-center absolute font-bold text-3xl">Grid</div>
      <div className="w-full h-full bg-yellow-500" />
      <div className="w-full h-full bg-yellow-400" />
      <div className="w-full h-full bg-yellow-500" />
    </div>
  ),
  'row': () => (
    <div className="flex flex-col w-full h-64 hover:border-red-500 hover:border-8 relative">
      <div className="flex items-center justify-center shadow-2xl drop-shadow-2xl	 text-white opacity-80 w-full h-full text-center absolute font-bold text-3xl">Row</div>
      <div className="w-full h-full bg-violet-500" />
      <div className="w-full h-full bg-violet-400" />
    </div>
  ),
  'column': () => (
    <div className="flex w-full h-64 hover:border-red-500 hover:border-8 relative">
      <div className="flex items-center justify-center shadow-2xl drop-shadow-2xl	 text-white opacity-80 w-full h-full text-center absolute font-bold text-3xl">Column</div>
      <div className="w-full h-full bg-emerald-500" />
      <div className="w-full h-full bg-emerald-400" />
    </div>
  ),
  'container': () => (
    <div className="">
      <div className="" />
      <div className="" />
      <div className="" />
    </div>
  ),
}

export function ViewportRender() {
  const { 
    context
   } = useEditor();

  const items = context.getShared('editor.components') || [];

  return (
    <div className="w-full">
      { items.map((it: any) => {
        const Cp = ComponentMap[it.name as keyof typeof ComponentMap];
        return <Cp />
      }) }
    </div>
  )
}