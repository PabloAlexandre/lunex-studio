// @TODO: Move this to core, but remove the references for all shared projects except state and register
import { createBasicCommand, createBasicItem } from "@lunex/commands"
import { EditorInfoContext } from "@lunex/state";

function createTypescript({ window }: EditorInfoContext) {
  window.openWindow('typescript');
}

function createCSS({ window }: EditorInfoContext) {
  window.openWindow('css');
}

export const CodeEditorCommands = [
  createBasicCommand('Code Editor', [
    createBasicItem('Create a typescript', 'Create a new typescript class for your project', createTypescript, "CodeIcon", () => true, () => 3),
    createBasicItem('Create a css', 'Create a new css file for your project', createCSS, "CSSIcon", () => true, () => 3),

  ])
]