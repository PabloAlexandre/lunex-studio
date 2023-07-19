import { Panel } from "@lunex/plugins/src";
import { SideMenu } from "../components/hiearchy";
import {
  MultiBackend,
  getBackendOptions,
  DndProvider
} from "@minoru/react-dnd-treeview";

const PanelComponent = () => {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <SideMenu />
    </DndProvider>
  )
}

export const StructurePanel = Panel.createBasePanel('structure', "StructureIcon", 'left', {
  Component: PanelComponent
});