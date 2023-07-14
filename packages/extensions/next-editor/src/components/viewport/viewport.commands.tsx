import { Commands } from "@lunex/plugins"
import { EditorInfoContext } from "@lunex/state";

const isViewportLocked = ({ settings, window }: EditorInfoContext) => settings.lock === true && window.opened === 'viewport';
const isViewportUnlocked = ({ settings, window }: EditorInfoContext) => settings.lock === false && window.opened === 'viewport';
const isGizmoHide = ({ settings, window }: EditorInfoContext) => settings.gizmos === false && window.opened === 'viewport';
const isGizmoVisible = ({ settings, window }: EditorInfoContext) => settings.gizmos === true && window.opened === 'viewport';
const isViewportDisabled = ({ window }: EditorInfoContext) => window.opened !== 'viewport';


function unlockViewport({ setSettings }: EditorInfoContext) {
  setSettings('lock', false);
}

function lockViewport({ setSettings }: EditorInfoContext) {
  setSettings('lock', true);
}

function hideGizmos({ setSettings }: EditorInfoContext) {
  setSettings('gizmos', false);
}

function showGizmos({ setSettings }: EditorInfoContext) {
  setSettings('gizmos', true);
}

function openViewport({ window }: EditorInfoContext) {
  window.openWindow('viewport')
}

export const ViewportCommands = Commands.createBasicCommand('Viewport', [
  Commands.createBasicItem('Go to viewport', 'Select current window as viewport', openViewport, "PageIcon", () => true, () => 10),
  Commands.createBasicItem('Lock viewport', 'Lock viewport from scroll', lockViewport, "LockIcon", isViewportUnlocked, () => 5),
  Commands.createBasicItem('Unlock viewport', 'Unlock viewport for scroll', unlockViewport, "UnlockIcon", isViewportLocked, () => 5),
  Commands.createBasicItem('Show gizmos', 'Show gizmos in viewport', showGizmos, "EyeIcon", isGizmoHide, () => 6),
  Commands.createBasicItem('Hide gizmos', 'Hide gizmos in viewport', hideGizmos, "EyeClosedIcon", isGizmoVisible, () => 6),
  Commands.createBasicItem('Go to viewport', 'Select current window as viewport', openViewport, "NewWindowIcon", isViewportDisabled, () => 10),
])