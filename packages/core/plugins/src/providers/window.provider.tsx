import { IconName } from "@lunex/icons";
import { ElementType, ReactNode } from "react";
import { v4 as uuid } from 'uuid';
import { PLUGIN_WINDOW_ID } from "../plugins.constants";

interface WindowConfig {
  filePath?: string;
}

export interface WindowPluginConfigProps {
  id: string;
  title: string;
  type: string;
  component: ElementType;
  config: WindowConfig;
  tabConfig: TabConfig;
}

interface TabConfig {
  icon: IconName | ReactNode;
  canClose: boolean;
  isEditable: boolean;
}

export class WindowPluginConfig {
  constructor(
    public readonly properties: WindowPluginConfigProps,
    public readonly identifier = PLUGIN_WINDOW_ID, 
  ) {}
}

function createWindow(type: string, title: string, component: ElementType, tabConfig: TabConfig = {
  icon: 'EyeIcon',
  canClose: true,
  isEditable: true,
}, config: WindowConfig = {}): WindowPluginConfig {
  
  return new WindowPluginConfig({
    id: uuid(),
    title,
    type,
    tabConfig,
    config,
    component,
  });
}

export const Window = {
  createWindow,
}