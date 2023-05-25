// @ts-nocheck

import { cloneElement } from "react";
import { RichHTML } from "../rich-html";

interface EditableProductionProps {
  text: string;
  children: any;
}

export function EditableProduction({
  text,
  children,
  ...remainingProps
}: EditableProductionProps) {
  const props = {
    ...remainingProps
  }

  if(text) {
    props.children = text;
  } else if(remainingProps.md) {
    props.children = <RichHTML value={remainingProps} />
  }

  const newChildren = cloneElement(children, props);

  return (
    <>
      { newChildren }
    </>
  )
}