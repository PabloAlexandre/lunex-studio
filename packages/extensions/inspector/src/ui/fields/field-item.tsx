'use client';

import { UIField } from "../ui-field";

export interface FieldProps {
  childrens: Array<any>;
  label: string;
  id: string;
}

export const Field = ({ childrens, id, label }: FieldProps) => {
  return (
    <div className="flex flex-1 items-center justify-between">
      <h4 className="text-xs text-gray-500 uppercase font-bold mr-4">{ label }</h4>
      {
        childrens.map(child => {
          const fieldId = `${id}${child.id ? '.'+child.id : ''}`;
          return (
          <UIField key={fieldId} field={child.type} id={fieldId} props={{...child, id: fieldId}} />
        )
      })
      }
    </div>
  )
}