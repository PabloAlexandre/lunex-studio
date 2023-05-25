import { useEffect } from "react"
import { useEditor } from "@editor/state";

export function useShortcut(key: string, fn: any, useCmd = true, deps: any = []) {
  useEffect(() => {
    function handleKeyDown(event: any) {
      if(event.key === key && (!useCmd || event.metaKey)) {
        event.preventDefault();

        fn();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, deps);
}

export function EditorShortcuts() {
  const {
    context,
    state,
    pageEditor,
  } = useEditor();


  // useShortcut("n", () => {
  //   if(confirm("Are you sure you want to delete all the states")) {
  //     editor.reset();
  //   }
  // }, false);

  useShortcut("e", () => {
    context.inspector.setActive('components');
  });

  useShortcut("l", () => {
    context.toggleSettings('lock');
  }, true, [ context.toggleSettings ]);

  useShortcut("g", () => {
    context.toggleSettings('gizmos');
  }, true, [ context.toggleSettings ]);

  useShortcut("d", () => {
    if(state.selection) {
      pageEditor.remove(state.selection);
    }
  }, true, [ state.selection ]);
  
  return (
    <>
    </>
  )
};