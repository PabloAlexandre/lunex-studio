import { Panel } from "@lunex/plugins";

const PanelComponent = () => {
  return (
    <>
      Timeline
    </>
  )
}

export const TimelinePanel = Panel.createBasePanel('timeline', "FrameIcon", 'right', {
  title: 'Timeline', 
  Component: PanelComponent
});