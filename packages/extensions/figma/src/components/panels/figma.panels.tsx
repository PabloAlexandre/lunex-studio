import { Panel } from "@lunex/plugins";

const PanelComponent = () => {
  return (
    <>
      Figma
    </>
  )
}

export const FigmaPanel = Panel.createBasePanel('figma', "FrameIcon", 'left', {
  title: 'Figma', 
  Component: PanelComponent
});