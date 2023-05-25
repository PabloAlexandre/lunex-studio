import { ReactNode, ElementType } from "react";
import { TextEditable } from "./text-editable";
import { EditableProvider } from "../editable-provider";
import { EditableProduction } from "./editable-production";
import { LinkEditable } from "./link-editable";
import { GroupEditable } from "./group-editable";
import { ImageEditable } from "./image-editable";


const EDITABLE_MAP = {
  'span': TextEditable,
  'div': TextEditable,
  'h1': TextEditable,
  'h2': TextEditable,
  'h3': TextEditable,
  'h4': TextEditable,
  'h5': TextEditable,
  'h6': TextEditable,
  'p': TextEditable,
  'a': LinkEditable,
  'button': LinkEditable,
  'img': ImageEditable,
}

type EditableElements = keyof typeof EDITABLE_MAP;


interface BaseProps {
  id: string;
  fixed?: boolean;
  title?: string;
}

type GroupProps = BaseProps & {
  children: (fn: any) => ReactNode, 
  props: {
    [key: string]: {
      title?: string;
      defaultValue?: string;
      [key: string]: any;
    };
  }
}

export const Group = ({
  children,
  id,
  title,
  fixed = false,
  props,
}: GroupProps) => {
  const state = EditableProvider.getInstance();

  if(!state.isEditable) {
    return <>{children(state.getValue(id))}</>
  }
  const val = state.getValue(id, props.defaultProps as any);

  return (
    <GroupEditable title={title} id={id} initialValue={val} fixed={fixed} {...props}>
      { children }
    </GroupEditable>
  )
}

type EditableProps = BaseProps & {
  children: ReactNode,
  props?: any;
}

export const Editable = ({
  children,
  title,
  id,
  fixed = false,
  props = {},
}: EditableProps) => {
  const state = EditableProvider.getInstance();

  if(!state.isEditable) {
    return <EditableProduction {...state.getValue(id)}>{children}</EditableProduction>
  }
  
  // @ts-ignore
  const EditableComponent = EDITABLE_MAP[children.type as EditableElements] as ElementType;

  if(!EditableComponent) {
    return <>{children}</>;
  }

  return (
    <EditableComponent {...props} title={title} id={id} fixed={fixed}>
      { children }
    </EditableComponent>
  )
}