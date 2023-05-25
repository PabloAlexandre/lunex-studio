import { ElementType } from "react";
import { EditorInfoContext } from "@editor/state";

export interface State {
  windows: CreateWindowProps[];
  inspectors: CreateInspectorPanelProps[];
  gizmos: any[];
  commands: CreateBaseCommandProps[];
  controllers: NodeItem[]
}

export type StateValue = CreateWindowProps | CreateInspectorPanelProps | CreateBaseCommandProps | NodeItem; 

export interface Size {
  w: number;
  h: number;
}

export interface NodeItem {
  size: Size;
  id: string;
  name: string;
  entrypoint: boolean;
  execution: (item: any) => void;
  ignoreOnNode: boolean;
  inputs?: {
    name: string;
    type: string;
    initial: number | string;
  }[];
  control: {
    type: string;
    initial: number | string;
    name: string;
  }[];
  outputs?: {
    name: string;
  }[];
  data: any;
  component?: any;
}

export interface CreateBaseCommandProps {
  title: string;
  subtitle: string;
  id: string;
  category: string;
  icon: any;
  isVisible: (info: EditorInfoContext) => boolean;
  priority: (info: EditorInfoContext) => number;
  handler: (info: EditorInfoContext, payload: any) => void;
}

export interface CreateInspectorPanelProps {
  id: string;
  title: string;
  component: ElementType;
}

export interface CreateWindowProps {
  id: string;
  title: string;
  attached?: boolean;
  component: ElementType;
}

export type Type = keyof State;