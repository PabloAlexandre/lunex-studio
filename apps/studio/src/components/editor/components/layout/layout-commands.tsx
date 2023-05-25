import { createBasicCommand, createBasicItem } from "@editor/commands"
import { EditorInfoContext } from "@editor/state";

const isInspectorVisible = ({ settings }: EditorInfoContext) => settings.inspector === true;
const isInspectorHide = ({ settings }: EditorInfoContext) => settings.inspector === false;

function hideInspector({ toggleSettings }: EditorInfoContext) {
  toggleSettings('inspector');
}

function showInspector({ toggleSettings }: EditorInfoContext) {
  toggleSettings('inspector');
}

export const LayoutCommands = [
  createBasicCommand('Editores', [
    createBasicItem('Hide sidebar', 'Hide inspector sidebar', hideInspector, "FullscreenIcon", isInspectorVisible, () => 3),
    createBasicItem('Show sidebar', 'Show inspector sidebar', showInspector, "SidebarIcon", isInspectorHide, () => 3),
  ])
]