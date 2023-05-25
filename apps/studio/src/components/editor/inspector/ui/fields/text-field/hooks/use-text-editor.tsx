import { ContentState, EditorState, Modifier, SelectionState, convertFromRaw, convertToRaw, getDefaultKeyBinding } from "draft-js";
import { useState } from "react";
import { linkDecorator } from "../decorators/link.decorator";
import { useRichStyles } from "./use-rich-styles";
// import { isValidUrl } from "../utils";
import { mdToDraftjs } from "draftjs-md-converter";

export function useTextEditor(value: string = '') {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      //@ts-ignore
      value.md !== undefined ? 
        //@ts-ignore
        convertFromRaw(mdToDraftjs(value.md)) : 
        ContentState.createFromText(value),
      linkDecorator
    )
  );
  
  const {
    handleInlineStyle,
    handleKeyCommand,
    getActiveStyles,
  } = useRichStyles(editorState, setEditorState);

  function pasteText(text: string, {
    start,
    end,
  }: any) {
    const selection = editorState.getSelection();

    const newSelection = selection.merge({
      anchorOffset: start,
      focusOffset: end,
    });

    const newContent = Modifier.replaceText(
      editorState.getCurrentContent(),
      newSelection,
      text,
    );

    const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    setEditorState(newEditorState);
  }

  function insertLink(editorState: EditorState, linkUrl: string, linkText: string) {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: linkUrl },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newContentState = Modifier.replaceText(
      contentStateWithEntity,
      selectionState,
      linkText,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    const insertedLinkSelection = SelectionState.createEmpty("").merge({
      anchorOffset: selectionState.getEndOffset(),
      focusOffset: selectionState.getEndOffset() + linkText.length,
      hasFocus: true,
    });
    const newEditorState = EditorState.forceSelection(
      EditorState.push(editorState, newContentState, 'insert-characters'),
      insertedLinkSelection,
    );

    setEditorState(newEditorState);
  }

  function handleKeyBinding(event: any) {
    if (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();

      const selection = window.getSelection();
      return navigator.clipboard.readText().then((data) => {

        // if(isValidUrl(data)) {
        //   const text = editorState.getCurrentContent().getPlainText();
        //   // insertLink(editorState, data, text);
        //   return text;
        // }
        pasteText(data, {
          start: selection?.anchorOffset,
          end: selection?.focusOffset,
        });
        return null;
      });
    }

    return getDefaultKeyBinding(event);
  }

  return {
    editorState,
    setEditorState,
    handleKeyBinding,
    handleInlineStyle,
    handleKeyCommand,
    getActiveStyles,
  }
}