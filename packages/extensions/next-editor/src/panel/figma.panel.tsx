import { Panel } from "@lunex/plugins";

const PanelComponent = () => {
  return (
    <div className="p-4">
      Figma Inspector
    </div>
  )
}

export const FigmaPanel = Panel.createBasePanel('figma', "FigmaIcon", 'left', {
  Component: PanelComponent
});