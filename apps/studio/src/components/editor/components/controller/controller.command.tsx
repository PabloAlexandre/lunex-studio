import { Icon } from "@editor/icons"
import { createBasicCommand, createBasicItem } from "@editor/commands"
import { EditorInfoContext } from "@editor/state";

function createNewController({ window }: EditorInfoContext) {
  window.openWindow('controller');

}
export const ControllerCommand = createBasicCommand('Controller', [
  createBasicItem("Create Controller", "Create a new empty controller for the project", createNewController, "ComponentIcon", () => true, () => 50)
])