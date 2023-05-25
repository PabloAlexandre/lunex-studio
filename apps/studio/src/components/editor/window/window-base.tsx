import { ElementType } from "react";
import { RegisterStorage, CreateWindowProps } from "@editor/register";

export function createWindow(info: CreateWindowProps) {
  RegisterStorage.getInstance().register("windows", info);
}