import { ReactNode, useEffect, useState } from "react";

import { Plugins } from "@lunex/plugins";
import { Finder } from "@lunex/commands";
import { EditorState } from "@lunex/state";
import { Window } from "@lunex/window";
export { useWindow } from "@lunex/window";
import { BasePlugins } from "@lunex-extensions/base"; 

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
      <Plugins initialPlugins={BasePlugins as any}>
        <Window>
          {children}
        </Window>
        <Finder />
      </Plugins>
    </EditorState>  
  ) : <Loading />;
}