import { createBasicCommand, createBasicItem } from "@lunex/commands"
import { EditorInfoContext } from "@lunex/state";

const isInspectorVisible = ({ settings }: EditorInfoContext) => settings.inspector === true;
const isInspectorHide = ({ settings }: EditorInfoContext) => settings.inspector === false;

function hideInspector({ toggleSettings }: EditorInfoContext) {
  toggleSettings('inspector');
}

function showInspector({ toggleSettings }: EditorInfoContext) {
  toggleSettings('inspector');
}

export const LayoutCommands = () => [
  createBasicCommand('Editor', [
    createBasicItem('Hide sidebar', 'Hide inspector sidebar', hideInspector, "FullscreenIcon", isInspectorVisible, () => 23132131321313),
    createBasicItem('Show sidebar', 'Show inspector sidebar', showInspector, "SidebarIcon", isInspectorHide, () => 23132131321313),
  ])
]