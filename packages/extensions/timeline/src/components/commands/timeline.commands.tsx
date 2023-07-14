import { Commands } from "@lunex/plugins"

export const TimelineCommandsConfig = Commands.createBasicCommand('Timeline', [
  Commands.createBasicItem("Create Animation", "Create a basic animation for selected element", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Create Sequence", "Create a sequence for the scene", () => {}, "FrameIcon", () => true, () => 1)
])