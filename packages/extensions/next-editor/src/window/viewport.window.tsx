import { Window } from "@lunex/plugins";
import { ViewportWindowsComponent } from "../components/viewport";

export function ViewportWindowImpl() {
  return (
    <ViewportWindowsComponent />
  )
}

export const ViewportWindow = Window.createWindow('viewport', 'Viewport', ViewportWindowImpl, {
  icon: "FrameIcon",
  canClose: false,
  isEditable: false,
}) as any;