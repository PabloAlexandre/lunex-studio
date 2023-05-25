'use client'; 

import { useContext } from "react";
import { EditorContext } from "../editor.context";

export function useEditor() {
  const val = useContext(EditorContext);
  if (!val) {
    throw new Error('No editor context found');
  }

  return val;
}