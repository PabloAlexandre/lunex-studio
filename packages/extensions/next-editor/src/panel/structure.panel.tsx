import { Panel } from "@lunex/plugins";

const PanelComponent = () => {
  return (
    <>
      Structure
    </>
  )
}

export const StructurePanel = Panel.createBasePanel('structure', "StructureIcon", 'left', {
  title: 'Structure', 
  Component: PanelComponent
});