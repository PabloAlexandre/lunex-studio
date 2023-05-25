import { Panel } from "@lunex/plugins";

const PanelComponent = () => {
  return (
    <>
      Inspector
    </>
  )
}

export const InspectorPanel = Panel.createBasePanel('inspector', "GlobeIcon", 'right', {
  title: 'Inspector', 
  Component: PanelComponent
});