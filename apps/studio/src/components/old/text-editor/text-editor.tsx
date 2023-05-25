import { Editor, convertToRaw } from "draft-js";
import { EditorMenu } from "./editor-menu";
import { useTextEditor } from "./hooks/use-text-editor";
import { BaseEditorComponent } from "../editable/subcomponents/base-editor-component";
import { draftjsToMd } from "draftjs-md-converter";

export function TextEditor({
  title,
  onClose,
  value,
  bounds,
  initialValue,
  handleChange,
}: any) {

  const {
    handleInlineStyle,
    handleKeyBinding,
    handleKeyCommand,
    getActiveStyles,
    editorState,
    setEditorState,
  } = useTextEditor(value || (initialValue ? initialValue.innerText : ''));

  const activeStyles = getActiveStyles();

  return (
    // <BaseEditorComponent bounds={bounds}>
      <header className="flex items-center justify-between bg-white border-b border-gray-300 py-2">
        <span>Edit <strong className="ml-2 bg-indigo-300 rounded-md px-2 py-1 text-white">{title}</strong></span>
        <EditorMenu onSetStyle={handleInlineStyle} enabledKeys={activeStyles} />
        <p className="m-0 inline-flex cursor-pointer" onClick={onClose}>Close</p>
      </header>
      <main className="py-2">
        <Editor 
          keyBindingFn={handleKeyBinding as any} 
          editorState={editorState} 
          onChange={(state) => {
            setEditorState(state);
            console.log({ md: draftjsToMd(convertToRaw(state.getCurrentContent())) });
            handleChange({
              md: draftjsToMd(convertToRaw(state.getCurrentContent())) 
            });
          }} 
          handleKeyCommand={handleKeyCommand} 
        />
      </main>
    // </BaseEditorComponent>
  )
}