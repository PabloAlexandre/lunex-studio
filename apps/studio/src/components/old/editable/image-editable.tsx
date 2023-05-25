'use client';

import { ReactNode, useState } from "react";
import { FieldEditable } from "./field-editable";
import { ImageUploader } from "../image-uploader/image-uploader";

export const ImageEditable = ({
  children,
  title,
  id,
  fixed = false,
}:  {
  title?: string,
  id: string,
  children: ReactNode
  fixed?: boolean;
}) => {
  const [ value, setValue ] = useState(typeof localStorage !== 'undefined' ? JSON.parse(localStorage?.getItem(`cms.${id}`) || 'null') : null);

  function handleChange(e: any) {
    localStorage.setItem(`cms.${id}`, JSON.stringify(e));
    setValue(e);
  }

  const additionalProps = value ? {
    src: value?.src,
    alt: value?.alt,
  } : {};

  return (
    <FieldEditable
    title={title}
    fixed={fixed}
    props={{
      color: 'indigo',
      zIndex: false,
      editableComponent: <ImageUploader title={title} handleChange={handleChange} value={value} />,
      ...additionalProps
    }}>
      { children }
    </FieldEditable>
  )
}