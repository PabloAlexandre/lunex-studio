'use client';

import { UIField } from "../ui-field";

interface HorizontalRowProps {
  childrens: Array<any>;
  id: string;
}
export const HorizontalRow = ({ childrens, id }: HorizontalRowProps) => {
  return (
    <div className="flex flex-1 my-4">
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