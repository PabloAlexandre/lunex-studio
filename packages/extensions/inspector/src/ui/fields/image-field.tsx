'use client';

import { useRef } from "react";
import { useEditor } from "@lunex/state";

interface Image {
  src?: string;
  alt?: string;
}

export function ImageField({
  title,
  id,
}: any) {
  const { context } = useEditor();
  const [ value, setValue ] = context.serializeField<Image>(id, {});

  const inputRef = useRef<HTMLInputElement>(null);
  const styles: any = {}
  
  function handleImageChange(e: any) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setValue((old: any) => ({
        ...old,
        src: reader.result
      }));
    }
    reader.readAsDataURL(file);
  }

  if(value?.src) {
    styles.backgroundImage = `url(${value?.src})`;
  }

  const className = value ? 'border-slate-200' : 'bg-gray-200 border-gray-300' ;

  return (
    <div className="flex justify-between w-full items-center my-4 mx-2">
      <h4 className="w-4/12 text-xs text-gray-500 uppercase font-bold">{title}</h4>
      <div className={className + " w-24 h-24 border cursor-pointer"} onClick={() => inputRef.current?.click()}>
        { value && <div className="w-full h-full bg-contain bg-center bg-no-repeat bg-transparent" style={styles}></div> }
        { !value && <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-500 text-xs">Drop Image</span>
        </div> }
      </div>
      <input ref={inputRef} type="file" onChange={handleImageChange}  className="hidden" />

    </div>
  )
}