import { Commands } from "@lunex/plugins/src"

export const FigmaCommandsConfig = Commands.createBasicCommand('Figma', [
  Commands.createBasicItem("Open Figma", "This opens figma", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Close Figma", "this closes figma", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Create new Figma File", "Blah blah blah", () => {}, "FrameIcon", () => true, () => 1)
])