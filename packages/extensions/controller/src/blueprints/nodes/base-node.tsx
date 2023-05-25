import { createBasicCommand, createBasicItem, isViewActive } from "@lunex/commands";
import { ElementType, useEffect, useRef, useState } from "react";
import { ClassicPreset } from "rete";
import { Drag } from "rete-react-render-plugin";
import { StyledSocket } from "../styles";
import { RegisterStorage } from "@lunex/plugins";
import { EditorInfoContext } from "@lunex/state";
import { IconName } from "@lunex/icons";

const socket = StyledSocket;

interface BaseNodeItemCommand {
  title: string;
  subtitle: string;
  icon: IconName;
  priority: () => number;
}

export function createBaseNodeItemCommand(title: string, subtitle: string, icon: IconName, priority: number = 100) {
  return {
    title: title,
    subtitle: subtitle,
    icon: icon,
    priority: () => priority,
  }
}

export const BaseNodeComponent = ({
  props,
  component: Component,
}: any) => {
  const [value, setValue] = useState(props.data.value)
  const ref = useRef<HTMLDivElement>(null);
  
  Drag.useNoDrag(ref)

  useEffect(() => {
    setValue(props.data.value)
  }, [props.data.value])

  const handleInputChange = (value: string) => {
    const inputText = value.trim();
    setValue(inputText);
    props.data.setValue(inputText)
  };
  
  return (
    <div className="w-full h-48 resize-none flex no-decorative" ref={ref}>
      <Component value={value} setValue={handleInputChange} />
    </div>
  )
}
export function pipe(...fns: any[]) {
  return (x: any) => fns.reduce((v, f) => f(v), x);
}

export const createNode = (width: number, height: number, id: string, name: string) => {
  return {
    size: { w: width, h: height },
    id,
    name,
  }
};

export const withControl = (control: any) => (node: any) => {
  return {
    ...node,
    control,
  }
}

export const withInputs = (inputs: any[]) => (node: any) => {
  return {
    ...node,
    inputs,
  }
}

export const withExecution = (execution: any, entrypoint = false) => (node: any) => {
  return {
    ...node,
    execution,
    entrypoint,
  }
}

export const withOutputs = (outputs: any[]) => (node: any) => {
  return {
    ...node,
    outputs,
  }
}

export const withDataHandler = (payload: any) => (node: any) => {
  return {
    ...node,
    data: (inputs: any, props: any) => {
      console.log("HERE");
      if(payload) {
        const res = payload(inputs, props);
      }

      return {
        value: props?.controls?.value?.value || 0
      };
    },
  }
}

export const withComponent = (component?: ElementType, ignoreOnNode?: boolean) => (node: any) => {
  return  {
    ...node,
    component: component,
    ignoreOnNode: ignoreOnNode,
  }
}

export const withIcon = (icon: any) => (node: any) => {
  return  {
    ...node,
    icon,
  }
}

export class BaseNode extends ClassicPreset.Node<
  any,
  { value: ClassicPreset.Socket },
  { value: ClassicPreset.InputControl<any> }
> {
  height: number;
  width: number;
  node: any;

  constructor(node: any, change?: () => void) {
    super(node.name);
    
    this.width = node.size.w;
    this.height = node.size.h;
    this.node = node;
    this.data = this.data.bind(this);

    node.control?.forEach((it: any) => {
      const type = it.type === 'json' ? "text" : it.type;

      this.addControl(
        "value",
        new ClassicPreset.InputControl(type as any, { 
          initial: it.initial,
          change,
          input: it.type,
        } as any)
      );
    })

    node.inputs?.forEach((it: any) => {
      const input = new ClassicPreset.Input(socket, it.name);

      //@ts-ignore
      this.addInput(it.name.toLowerCase(), input);
    }),
    node.outputs?.forEach((it: any) => {
      this.addOutput("value", new ClassicPreset.Output(socket, it.name));
    })
  }

  data(inputs: any) {
  return this.node.data(inputs, {
      controls: this.controls,
      inputs: this.inputs,
      outputs: this.outputs,
      addOutput: this.addOutput.bind(this),
    })
  }
}

export class BaseOperationNode extends BaseNode {}

function addNewNode(node: any) {
  return async ({
    getShared,
  }: EditorInfoContext) => {
    const { process, editor } = getShared('controller-editor') as any;

    const newNode = node.data ? new BaseOperationNode(node, process) : new BaseNode(node, process);
    await editor.addNode(newNode);
  }
}

export function createBaseNode(itemInfo: BaseNodeItemCommand, node: any, category = "Controller Primitives") {
  createBasicCommand(category, [
    createBasicItem(itemInfo.title, itemInfo.subtitle, addNewNode(node), itemInfo.icon, isViewActive('controller'), itemInfo.priority)
  ]);

  if(Array.isArray(node)) {
    node.forEach(it => {
      RegisterStorage.getInstance().register('controllers', it);
    })
    return;
  }

  RegisterStorage.getInstance().register('controllers', node);
}