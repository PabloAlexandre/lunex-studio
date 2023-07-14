import { Window } from "@lunex/plugins";

export function TimelineWindowImpl() {
  return (
    <>
      Timeline
    </>
  )
}

export const TimelineWindow = Window.createWindow('timeline', 'Timeline', TimelineWindowImpl, {
  icon: "FrameIcon",
  canClose: true,
  isEditable: true,
}) as any;