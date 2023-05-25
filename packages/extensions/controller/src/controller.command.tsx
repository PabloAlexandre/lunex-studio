import { Icon } from "@lunex/icons"
import { createBasicCommand, createBasicItem } from "@lunex/commands"
import { EditorInfoContext } from "@lunex/state";

function createNewController({ window }: EditorInfoContext) {
  window.openWindow('controller');

}
export const ControllerCommand = createBasicCommand('Controller', [
  createBasicItem("Create Controller", "Create a new empty controller for the project", createNewController, "ComponentIcon", () => true, () => 50)
])