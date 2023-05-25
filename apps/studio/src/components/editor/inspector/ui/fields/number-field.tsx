'use client';

// import { useDraggableMouse } from "@editor/hooks";

export function NumberField({
  title,
  id,
}: any) {
  const mouse = {
    value: 0,
    setValue: (value: any) => {},
    onStart: () => {},
  }

  // const mouse = useDraggableMouse({
  //   id,
  // });

  return (
    <div className="flex justify-between w-full items-center my-4 mx-2 cursor-ew-resize user-select-none" onMouseDown={mouse.onStart}>
      <h4 className="w-4/12 text-xs text-gray-500 uppercase font-bold">{title}</h4>
      <div className="w-8/12 items-center flex">
        
          <input type="number" value={mouse.value} onChange={(e) => mouse.setValue(e.target.value)}  className="w-full bg-gray-200 p-2 cursor-ew-resize appearance-none w-full" />
      </div>
    </div>
  )
}