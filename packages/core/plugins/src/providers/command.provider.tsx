import slugify from "slugify";
import { IconName } from "@lunex/icons/src";
import { PLUGIN_COMMANDS_ID } from "../plugins.constants";
import { EditorInfoContext } from "../plugins.type";
import { v4 as uuid } from 'uuid';

export type CommandPluginConfigProps = {
  id: string;
  title: string,
  subtitle: string,
  type: string,
  category: string,
  priority: (info: EditorInfoContext) => number,
  isVisible: (info: EditorInfoContext) => boolean,
  icon: IconName,
  handler: (info: EditorInfoContext) => void,
}

export class CommandPluginConfig {
  constructor(
    public readonly properties: CommandPluginConfigProps,
    public readonly identifier = PLUGIN_COMMANDS_ID, 
  ) {}
}

function createBaseCommand(info: CommandPluginConfigProps) {
  return new CommandPluginConfig(info);
}


export interface BaseItem {
  title: string;
  subtitle: string;
  priority: (info: EditorInfoContext) => number;
  isVisible: (info: EditorInfoContext) => boolean;
  icon: IconName;
  handler: (info: EditorInfoContext) => void;
}

function createBasicItem(title: string, subtitle: string, handler: (info: EditorInfoContext) => void, icon?: IconName, isVisible?: (info: EditorInfoContext) => boolean, priority?: (info: EditorInfoContext) => number) {
  return {
    title: title,
    subtitle: subtitle,
    priority: priority || (() => 0),
    isVisible: isVisible || (() => true),
    icon: icon || "AppsIcon",
    handler: handler,
  }
}

function isViewActive(id: string) {
  return ({ window }: EditorInfoContext) => {
    return window.opened === id;
  }
}

function createBasicCommand(category: string, items: BaseItem[]) {

  return items.map((item) => {
    return createBaseCommand({
      id: uuid(),
      title: item.title,
      subtitle: item.subtitle,
      type: slugify(item.title).toLowerCase(),
      category: category,
      priority: item.priority,
      isVisible: item.isVisible,
      icon: item.icon,
      handler: item.handler,
    })
  })
}

export const Commands = {
  createBasicCommand,
  createBasicItem,
  isViewActive,
}
