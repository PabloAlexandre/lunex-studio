import { ViewportCommands } from "../components/viewport";
import { ComponentsCommands } from "./components";
import { LayoutCommands } from "./layout.commands";

export const Commands = [
  ...ViewportCommands,
  ...LayoutCommands,
  ...ComponentsCommands,
]