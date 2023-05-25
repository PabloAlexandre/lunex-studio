'use client';

import { EditorInfoContext } from "../editor.types";
import { useEditorInfo } from "./useEditorState";
import { useSerializeEditor } from "./useSerializeEditor";
import { usePageEditor } from "./usePageEditor";

export function useEditorManager(name: string): any {
  const serializer = useSerializeEditor(name);

  const {
    editorContext,
    editorInfo,
  } = useEditorInfo(serializer)

  const pageEditor = usePageEditor(serializer);


  function eventHandler(cb: (info: EditorInfoContext, payload: any) => void) {
    const node = editorContext.selection.id ? pageEditor.getNode(editorContext.selection.id) : null;
    cb(editorContext, node);
  }

  return {
    name,
    pageEditor,
    context: editorContext,
    state: editorInfo,
    eventHandler,
  }
}