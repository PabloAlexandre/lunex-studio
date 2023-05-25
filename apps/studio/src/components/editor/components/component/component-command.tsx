import { createBasicCommand, createBasicItem } from "@editor/commands"
import { EditorInfoContext } from "@editor/state";

function createNewComponent({ window }: EditorInfoContext) {
  window.openWindow('component');

}
export const ComponentCommand = createBasicCommand('Components', [
  createBasicItem("Create Component", "Create a new empty component for the project", createNewComponent, "ComponentIcon", () => true, () => 1)
])