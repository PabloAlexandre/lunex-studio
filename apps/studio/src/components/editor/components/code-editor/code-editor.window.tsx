import { createWindow } from "@editor/window"
import { TypescriptCodeEditor } from "./panel/typescript";
import { CSSCodeEditor } from "./panel/css";

export const TypescriptEditorWindow = createWindow({
  id: 'typescript',
  title: 'new-file.ts',
  component: TypescriptCodeEditor,
});

export const CSSEditorWindow = createWindow({
  id: 'css',
  title: 'new-styles.css',
  component: CSSCodeEditor,
});