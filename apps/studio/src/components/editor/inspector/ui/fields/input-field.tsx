'use client';

import { useEditor } from "@editor/state";

export function InputField({
  title,
  id,
}: any) {
  const { context } = useEditor();

  const [value, setValue] = context.serializeField(id, '');

  return (
    <div className="flex justify-between w-full items-center my-4">
      <h4 className="w-4/12 text-xs text-gray-500 uppercase font-bold">{title}</h4>
      <div className="w-8/12 items-center flex ml-4">
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="w-full bg-white p-2  appearance-none w-full" />
      </div>
    </div>
  )
}