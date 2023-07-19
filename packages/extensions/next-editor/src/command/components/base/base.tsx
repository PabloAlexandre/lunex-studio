import { Commands } from "@lunex/plugins/src"
import { EditorInfoContext } from "@lunex/state/src";


function addComponent(name: string) {
  return ({ getShared, addShared }: EditorInfoContext) => {
    const initial = getShared('editor.components') || [];
    addShared('editor.components', [...initial, {
      name,
      id: initial.length + 1,
    }]);
  }
}

export const ComponentsBaseCommand = Commands.createBasicCommand('Base', [
  Commands.createBasicItem('Create Row', 'Create a row element into selection', addComponent("row"), "RowIcon", () => true, () => 20),
  Commands.createBasicItem('Create Column', 'Create a column element into selection', addComponent("column"), "ColumnIcon", () => true, () => 20),
  Commands.createBasicItem('Create Grid', 'Create a grid element into selection', addComponent("grid"), "GridIcon",  () => true, () => 20),
  Commands.createBasicItem('Create Container', 'Create a container element into selection', addComponent("container"), "BoxIcon",  () => true, () => 20),
])