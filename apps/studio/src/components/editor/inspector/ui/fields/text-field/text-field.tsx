'use client';

import { Editor, convertToRaw } from "draft-js";
import { useEditor } from "@editor/state";
import { EditorMenu } from "./editor-menu";
import { useTextEditor } from "./hooks/use-text-editor";
import { draftjsToMd } from "draftjs-md-converter";

interface TextField {
  md?: string;
}

export function TextField({
  title,
  id,
}: any) {
  const { context } = useEditor();

  const [ value, setValue ] = context.serializeField<TextField>(id, {});

  const {
    handleInlineStyle,
    handleKeyBinding,
    handleKeyCommand,
    getActiveStyles,
    editorState,
    setEditorState,
  } = useTextEditor(value?.md ? value.md : '');
  
  const activeStyles = getActiveStyles();

  return (
    <div>
      <h4 className="text-xs text-gray-500 uppercase font-bold mb-4">{title}</h4>

      <section>
        <header className="flex p-1 px-2 items-center border border-gray-300 justify-between bg-white border-b border-gray-300 py-2">
          <EditorMenu onSetStyle={handleInlineStyle} enabledKeys={activeStyles} />
        </header>
        <main className="p-4 border border-gray-300 bg-white">
          <Editor
            keyBindingFn={handleKeyBinding as any}
            editorState={editorState}
            onChange={(state) => {
              setEditorState(state);
              setValue({
                md: draftjsToMd(convertToRaw(state.getCurrentContent()))
              });
            }}
            handleKeyCommand={handleKeyCommand}
          />
        </main>
      </section>
    </div>
  )
}

