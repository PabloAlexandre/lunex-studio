import { ReactNode } from "react";
import { SchemaField } from "@/components/editor/inspector/ui";

export interface Alignment {
  horizontal: 'left' | 'center' | 'right' | 'space-between';
  vertical: 'left' | 'center' | 'right';
}
export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Style {
  textColor: string;
  backgroundColor: string;
}

export interface BaseProps {
  id: string;
  type: string;
  children: ReactNode;
}

export type PropertyNodes = {
  type: SchemaField;
  title: string;
  id: string;
  [key: string] : any;
}

export interface BaseNode {
  id: string;
  type?: SchemaField;
  childrens: Array<BaseNode | PropertyNodes>;
}

export type Schema = {
  [label: string]: BaseNode;
}



export enum ItemType {
  COMPONENT = 'component',
  GIZMOS = 'gizmos',
  HIERARCHY_ITEM = 'hierarchy-item',
}
