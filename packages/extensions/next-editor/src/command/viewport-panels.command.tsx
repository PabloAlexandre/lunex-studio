import { Commands } from "@lunex/plugins"

export const ViewportPanelsConfig = Commands.createBasicCommand('Viewport Panels', [
  Commands.createBasicItem("Hide left panel", "Hides left panel", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Show left panel", "Show left panel", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Hide right panel", "Hides right panel", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Show right panel", "Show right panel", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Hide gizmos", "Hide gizmos", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Show gizmos", "Show gizmos", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Lock viewport", "Lock viewport", () => {}, "FrameIcon", () => true, () => 1),
  Commands.createBasicItem("Unlock viewport", "Unlock viewport", () => {}, "FrameIcon", () => true, () => 1)
])