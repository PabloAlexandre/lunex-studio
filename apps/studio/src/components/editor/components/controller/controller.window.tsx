import { createWindow } from "@editor/window"
import { Blueprint } from "./blueprints/blueprint"

export const ControllerWindowImpl = () => (
  <Blueprint />
)

export const ControllerWindow = createWindow({
  id: 'controller',
  title: 'New Controller',
  component: ControllerWindowImpl,
});