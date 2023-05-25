'use client';

import { ReactNode } from "react";
import { FieldEditable } from "./field-editable";
import { TextEditor } from "../text-editor/text-editor";
import { RichHTML } from "../rich-html";
import { useCmsState } from "../cms-provider/cms-provider-client";

export const TextEditable = ({
  children,
  title,
  id
}: {
  title?: string,
  id: string,
  children: ReactNode
}) => {

  const {
    value,
    setValue,
  } = useCmsState(id);

  return (
    <FieldEditable
      id={id}
      title={title}
      props={{
        color: 'green',
        children: value && <RichHTML value={value} />,
        editableComponent: <TextEditor title={title} handleChange={setValue} value={value} />
      }}
    >
      {children}
    </FieldEditable>
  )
}