import { ReactNode, useEffect, useState } from "react";

import { Plugins } from "@lunex/plugins/src";
import { Finder } from "@lunex/commands/src";
import { EditorState } from "@lunex/state/src";
import { Window } from "@lunex/window/src";
export { useWindow } from "@lunex/window/src";
import { NextEditorPlugin } from "@lunex-extensions/next-editor/src";

interface EditorProps {
  children: ReactNode;
}

const Loading = () => (
  <div className="flex items-center justify-center h-screen w-screen">
    <h1 className="text-gray-400 text-2xl text-extralight">Carregando Charles...</h1>
  </div>
);

export function Editor({ children }: EditorProps) {
  const [ state, setState ] = useState(false);

  useEffect(() => {
    setTimeout(() => setState(true), 1000);
  }, []);

  return state ? (
    <EditorState name="elza-133">
      <Plugins initialPlugins={NextEditorPlugin as any}>
        <Window>
          {children}
        </Window>
        <Finder />
      </Plugins>
    </EditorState>  
  ) : <Loading />;
}