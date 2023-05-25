'use client';

import { useEditor } from "@editor/state"

export function RangeField({
  title,
  id,
  min = "0",
  max = "100"
}: any) {
  const { context } = useEditor();
  const [ value, setValue ] = context.serializeField(id, 1)
  
  return (
    <div className="flex justify-between w-full items-center my-4">
      <h4 className="w-4/12 text-xs text-gray-500 uppercase font-bold">{title}</h4>
      <div className="w-8/12 items-center flex">
        <input id="default-range" type="range" value={value*100} onChange={(e) => setValue(parseInt(e.target.value)/100)} min={min} max={max} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer w-full" />
      </div>
    </div>
  )
}