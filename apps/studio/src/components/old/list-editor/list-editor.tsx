import { useState } from "react";
import { BaseEditorComponent } from "../editable/subcomponents/base-editor-component";
import { TrashIcon } from "../icons";

export function ListEditor({
  title,
  onClose,
  value,
  bounds,
  handleChange,
}: any) {
  const [ currentValue, setValue ] = useState(value);

  function handleItemChange(index: number, key: string) {
    return (e: any) => {
      const newValue = {
        ...currentValue,
        items: currentValue.items.map((item: any, i: number) => {
          if (i === index) {
            return {
              ...item,
              [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            }
          }

          return item;
        })
      };

      setValue(newValue);
      handleChange(newValue);
    }
  }

  function addItem() {
    const newValue = {
      ...currentValue,
      items: [
        ...currentValue.items,
        {
          text: '',
          link: '',
          rounded: false,
        }
      ]
    };

    setValue(newValue);
    handleChange(newValue);
  }

  function removeItem(index: number) {
    const newValue = {
      ...currentValue,
      items: currentValue.items.filter((_: any, idx: number) => idx !== index)
    };

    setValue(newValue);
    handleChange(newValue);
  }

  return (
    <BaseEditorComponent bounds={bounds} zIndex={50}>
      <header className="flex items-center justify-between bg-white border-b border-gray-300 py-2 px-4">
        <span>Edit <strong className="ml-2 bg-indigo-300 rounded-md px-2 py-1 text-white">{title}</strong></span>
        <p className="m-0 inline-flex cursor-pointer" onClick={onClose}>Close</p>
      </header>
      <main className="flex flex-col items-center w-full bg-white p-4 border-4 border-white">
        {
          currentValue.items?.map((item: any, index: number) => (
            <div className="mb-4 w-full flex flex-col no-wrap" key={index}>
              <div className="grid" style={{ gridTemplateColumns: '1fr 8fr 8fr 4fr' }}>
                <div className="w-full mr-4 flex items-center" onClick={() => removeItem(index)}>
                  <TrashIcon size={4} className="cursor-pointer text-red-700" color="red" />
                </div>
                <div className="w-full mr-4 flex items-center">
                  <label className="uppercase font-bold text-xs mr-2  text-gray-600 ">Texto</label>
                  <input value={item.text} onChange={handleItemChange(index, 'text')} type="text" className="border border-gray-300 outline-0 rounded-md p-1 text-sm" />
                </div>

                <div className="w-full mr-4 flex items-center">
                <label className="uppercase font-bold text-xs text-gray-j600 mr-2 w-5/12">Link</label>
                  <input value={item.link} onChange={handleItemChange(index, 'link')} type="text" className="border border-gray-300 outline-0 rounded-md p-1 text-sm mr-4" />
                </div>

                <div className="w-full flex items-center">
                  <label className="uppercase font-bold text-xs mr-2 text-gray-600">Rounded</label>
                  <input checked={item.rounded} onChange={handleItemChange(index, 'rounded')} type="checkbox" className="border border-gray-300 outline-0 rounded-md p-1 text-sm" />
                </div>
              </div>
            </div>
          ))
        }
        <div className="w-full bg-indigo-300 rounded-sm text-white text-center font-bold p-2 mt-4 cursor-pointer font-sm" onClick={addItem}>
          Adicionar item
        </div>
      </main>
    </BaseEditorComponent>
  )
}