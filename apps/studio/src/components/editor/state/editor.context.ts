import { createContext } from "react";
import { Editor } from "./editor.types";


export const EditorContext = createContext<Editor>({
  name: '',
  eventHandler: () => {},
  pageEditor: {} as any,
  state: {} as any,
  context: {} as any,
});
