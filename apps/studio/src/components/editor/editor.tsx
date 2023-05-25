'use client';

import { Register } from "@editor/register";

import { EditorState } from "@editor/state";
import { Inspector } from "@editor/inspector";
import { EditorShortcuts } from "@editor/utils/shortcuts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Finder } from "@editor/commands";
import { Window } from "@editor/window";

export function Editor() {
  return (
    <EditorState name="elza-19">
      <Register>
        <DndProvider backend={HTML5Backend}>
            <EditorShortcuts />
            <Window />
            <Finder />
            <Inspector />

            {/* 
            <Draggable>
              <Window>
              </Window>
            </Draggable> */}

        </DndProvider>
      </Register>
    </EditorState>  
  )
}