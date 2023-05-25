import { Window } from "@lunex/plugins";

export function ViewportWindowImpl() {
  return (
    <div>
      Viewport
    </div>
  )
}

export const ViewportWindow = Window.createWindow('viewport', 'Viewport', ViewportWindowImpl, {
  icon: "FrameIcon",
  canClose: false,
  isEditable: false,
}) as any;