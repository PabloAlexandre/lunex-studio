import { Window } from "@lunex/plugins";
import { ViewportContainer } from "../components/viewport";

export function ViewportWindowImpl() {
  return (
    <ViewportContainer />
  )
}

export const ViewportWindow = Window.createWindow('viewport', 'Viewport', ViewportWindowImpl, {
  icon: "FrameIcon",
  canClose: false,
  isEditable: false,
}) as any;