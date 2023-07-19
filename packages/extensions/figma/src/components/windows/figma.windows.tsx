import { Window } from "@lunex/plugins/src";

export function FigmaWindowImpl() {
  return (
    <>
      Figma
    </>
  )
}

export const FigmaWindow = Window.createWindow('figma', 'Figma', FigmaWindowImpl, {
  icon: "FrameIcon",
  canClose: false,
  isEditable: true,
}) as any;