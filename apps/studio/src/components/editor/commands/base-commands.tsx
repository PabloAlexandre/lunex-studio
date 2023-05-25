'use client';

import { RegisterStorage, CreateBaseCommandProps } from "@editor/register";
import { EditorInfoContext } from "@editor/state";
import slugify from "slugify";
import { IconName } from "@editor/utils/icons";

export function createBaseCommand(info: CreateBaseCommandProps) {
  RegisterStorage.getInstance().register("commands", info);
}


export interface BaseItem {
  title: string;
  subtitle: string;
  priority: (info: EditorInfoContext) => number;
  isVisible: (info: EditorInfoContext) => boolean;
  icon: IconName;
  handler: (info: EditorInfoContext) => void;
}

export function createBasicItem(title: string, subtitle: string, handler: (info: EditorInfoContext) => void, icon?: IconName, isVisible?: (info: EditorInfoContext) => boolean, priority?: (info: EditorInfoContext) => number) {
  return {
    title: title,
    subtitle: subtitle,
    priority: priority || (() => 0),
    isVisible: isVisible || (() => true),
    icon: icon || "AppsIcon",
    handler: handler,
  }
}

export function isViewActive(id: string) {
  return ({ window }: EditorInfoContext) => {
    return window.opened === id;
  }
}

export function createBasicCommand(category: string, items: BaseItem[]) {

  items.forEach((item) => {
    createBaseCommand({
      title: item.title,
      subtitle: item.subtitle,
      id: slugify(item.title).toLowerCase(),
      category: category,
      priority: item.priority,
      isVisible: item.isVisible,
      icon: item.icon,
      handler: item.handler,
    })
  })
}
