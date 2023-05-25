import { useRef, useState } from "react";
import { BaseEditorComponent } from "../editable/subcomponents/base-editor-component";

export function ImageUploader({
  title,
  onClose,
  value,
  bounds,
  initialValue,
  handleChange,
}: any) {

  const inputRef = useRef<HTMLInputElement>(null);
  const [ 
    currentValue,
    setValue
  ] = useState(value || initialValue);

  function updateValue({
    src = currentValue.src,
    alt = currentValue.alt,
  }: any) {
    const newValue = {
      src,
      alt,
    };

    setValue(newValue);
    handleChange(newValue);
  }

  function handleAltChange(e: any) {
    updateValue({
      alt: e.target.value,
    });
  }

  function handleImageChange(e: any) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      updateValue({
        src: reader.result,
      });
    }
    reader.readAsDataURL(file);
  }

  return (
    <BaseEditorComponent bounds={bounds} zIndex={50}>
      <header className="flex items-center justify-between bg-white border-b border-gray-300 py-2">
        <span>Edit <strong className="ml-2 bg-indigo-300 rounded-md px-2 py-1 text-white">{title}</strong></span>
        <p className="m-0 inline-flex cursor-pointer" onClick={onClose}>Close</p>
      </header>
      <main className="py-2 flex justify-center my-4">
        <div className="w-8/12 ">
          <div className="mb-8">
            <img src={currentValue.src} alt={currentValue.alt} className="cursor-pointer w-full border-2 border-indigo-100" onClick={() => inputRef.current?.click()} />
            <p className="text-center font-sm opacity-50 mt-2">{ currentValue.alt }</p>
            <input ref={inputRef} type="file" onChange={handleImageChange} className="hidden" />
          </div>
          <div className="flex w-full items-center">
            <label className="uppercase font-bold text-xs text-gray-600 mr-8">Alt</label>
            <input onChange={handleAltChange} value={currentValue.alt} type="text" className="flex w-full border border-gray-300 outline-0 rounded-md p-1 text-sm" />
          </div>
        </div>
      </main>
    </BaseEditorComponent>
  )
}