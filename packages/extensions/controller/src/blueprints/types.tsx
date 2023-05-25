import { ClassicPreset, GetSchemes } from "rete";
import { ContextMenuExtra } from "rete-context-menu-plugin";
import { ReactArea2D } from "rete-react-render-plugin";

export class Connection<
  A extends Node,
  B extends Node
> extends ClassicPreset.Connection<A | any, B | any> {}

export type Node = any;
export type ConnProps = Connection<any, any> | Connection<any, any>;
export type Schemes = any;

export type AreaExtra = ReactArea2D<any> | ContextMenuExtra;