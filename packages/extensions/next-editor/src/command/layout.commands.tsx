import { Commands } from "@lunex/plugins/src"
import { EditorInfoContext } from "@lunex/state/src";

const isInspectorVisible = ({ settings }: EditorInfoContext) => settings.inspector === true;
const isInspectorHide = ({ settings }: EditorInfoContext) => settings.inspector === false;

function hideInspector({ toggleSettings }: EditorInfoContext) {
  toggleSettings('inspector');
}

function showInspector({ toggleSettings }: EditorInfoContext) {
  toggleSettings('inspector');
}

export const LayoutCommands = Commands.createBasicCommand('Editor', [
  Commands.createBasicItem('Hide sidebar', 'Hide inspector sidebar', hideInspector, "FullscreenIcon", isInspectorVisible, () => 4),
  Commands.createBasicItem('Show sidebar', 'Show inspector sidebar', showInspector, "SidebarIcon", isInspectorHide, () => 4),
])