import { EditorState, Modifier, RichUtils } from "draft-js";
import { InlineStyles } from "../editor-menu";

export function useRichStyles(editorState: EditorState, setEditorState: (newState: EditorState) => void) {

  function handleInlineStyle(style: InlineStyles) {
    return () => {

      if(style === 'UPPERCASE' || style === 'LOWERCASE' || style === 'LETTERCASE') {
        setEditorState(applyCase(editorState, style.toLowerCase() as any));
        return;
      }
      clearSelection(style);
    }
  }

  function clearSelection(style: string) {
    const selection = editorState.getSelection();

    if(selection.getEndOffset() === selection.getAnchorOffset()) {
      const newEditorState = EditorState.moveFocusToEnd(editorState);
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, style))
      return;
    }

    const newSelection = selection.merge({
      anchorKey: selection.getAnchorKey(),
      anchorOffset: selection.getEndOffset(),
      focusKey: selection.getAnchorKey(),
      focusOffset: selection.getEndOffset(),
      isBackward: false,
    });

    const newEditorState = EditorState.forceSelection(RichUtils.toggleInlineStyle(editorState, style), newSelection);
    setEditorState(newEditorState)
  }

  function applyCase(editorState: EditorState, caseType: 'uppercase' | 'lowercase' | 'lettercase') {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const selectedText = contentState
      .getBlockForKey(selectionState.getStartKey())
      .getText()
      .slice(selectionState.getStartOffset(), selectionState.getEndOffset());
  
    let newContentState;
  
    if (caseType === 'uppercase') {
      newContentState = Modifier.replaceText(
        contentState,
        selectionState,
        selectedText.toUpperCase(),
        editorState.getCurrentInlineStyle(),
      );
    } else if (caseType === 'lowercase') {
      newContentState = Modifier.replaceText(
        contentState,
        selectionState,
        selectedText.toLowerCase(),
        editorState.getCurrentInlineStyle(),
      );
    } else {
      newContentState = Modifier.replaceText(
        contentState,
        selectionState,
        selectedText.replace(/\b\w/g, (l) => l.toUpperCase()),
        editorState.getCurrentInlineStyle(),
      );
    }

    if(!newContentState) return editorState;
  
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'change-block-data',
    );
  
    return EditorState.forceSelection(
      newEditorState,
      newContentState.getSelectionAfter(),
    );
  }

  function handleKeyCommand(command: string, editorState: EditorState) {
    // @ts-ignore
    if(command.then) {
      // @ts-ignore
      command.then((data: any) => {
      });
      return 'not-handled';
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  function getActiveStyles() { 
    const selectedStyle = editorState?.getCurrentInlineStyle() as any;
    return selectedStyle.reduce((acc: Set<any>,_: string, key: any) => {
      if (!selectedStyle[key]) {
        acc.add(key);
      }

      return acc;
    }, new Set());
  }
  return {
    handleInlineStyle,
    handleKeyCommand,
    getActiveStyles,
  }
}