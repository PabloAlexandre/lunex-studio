'use client';

import { ElementType, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { FieldEditable } from "./field-editable";

const Context = createContext({});

export function useGroupEditable(items: any) {
  const a = useContext(Context);
  return a;
}

export const GroupEditable = ({
  children,
  title,
  fixed,
  id,
  initialValue,
  EditableComponent,
}:  {
  title?: string,
  id: string,
  fixed: boolean,
  children: (a: any) => ReactNode,
  initialValue?: any;
  EditableComponent?: ElementType;
}) => {
  const [ child, setChild ] = useState(children(initialValue));
  const [ value, setValue ] = useState(initialValue);

  function handleChange(e: any) {
    localStorage.setItem(`cms.${id}`, JSON.stringify(e));
    setValue(e);
    setChild(children(e));
  }

  useEffect(() => {
    const val = JSON.parse(localStorage?.getItem(`cms.${id}`) || JSON.stringify(initialValue));
    setValue(val);

    // @ts-ignore
    setChild(children(val));
  }, []);

  return (
    <FieldEditable
    title={title}
    hoverId="group"
    fixed={fixed}
    props={{
      color: 'rose',
      editableComponent: EditableComponent && <EditableComponent title={title} handleChange={handleChange} value={value} />,
    }}>
      { child }
    </FieldEditable>
  )
}