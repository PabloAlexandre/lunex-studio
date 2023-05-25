import { createBasicCommand, createBasicItem } from "@editor/commands"
import { EditorInfoContext } from "@editor/state";

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

export const ViewportCommands = [
  createBasicCommand('Viewport', [
    createBasicItem('Lock viewport', 'Lock viewport from scroll', lockViewport, "LockIcon", isViewportUnlocked, () => 5),
    createBasicItem('Unlock viewport', 'Unlock viewport for scroll', unlockViewport, "UnlockIcon", isViewportLocked, () => 5),
    createBasicItem('Show gizmos', 'Show gizmos in viewport', showGizmos, "EyeIcon", isGizmoHide, () => 6),
    createBasicItem('Hide gizmos', 'Hide gizmos in viewport', hideGizmos, "EyeClosedIcon", isGizmoVisible, () => 6),
    createBasicItem('Go to viewport', 'Select current window as viewport', openViewport, "NewWindowIcon", isViewportDisabled, () => 10),
  ])
]