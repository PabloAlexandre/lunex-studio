import { Panel } from "@lunex/plugins/src";

const PanelComponent = () => {
  return (
    <div className="p-4">
      Inspector
    </div>
  )
}

export const InspectorPanel = Panel.createBasePanel('inspector', "GlobeIcon", 'right', {
  Component: PanelComponent
});