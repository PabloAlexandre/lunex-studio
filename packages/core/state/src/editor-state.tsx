'use client';
import { EditorContext } from "./editor.context";
import { useEditorManager } from "./hooks";

interface EditorState {
  name: string;
  children: any;
}

export function EditorState({
  name,
  children
}: any) {
  const manager = useEditorManager(name);
  return (
    <EditorContext.Provider value={manager}>
      { children }
    </EditorContext.Provider>
  )
}