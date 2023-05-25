import './nodes';

import { NodeEditor } from "rete";
import { AreaExtra, Schemes } from "./types";
import { AreaExtensions, AreaPlugin } from "rete-area-plugin";
import { ConnectionPlugin, Presets as ConnectionPresets } from "rete-connection-plugin";
import { Presets, ReactRenderPlugin, useRete } from "rete-react-render-plugin";
import { AutoArrangePlugin, Presets as ArrangePresets } from "rete-auto-arrange-plugin";
import { DataflowEngine } from "rete-engine";
import { createRoot } from "react-dom/client";
import { ContextMenuPlugin, Presets as ContextMenuPresets } from "rete-context-menu-plugin";
import { StyledConnection, StyledControl, StyledNode, StyledSocket } from "./styles";
import { useEditor } from "@editor/state";
import { useEffect } from "react";

import { BaseOperationNode, BaseNode } from "./nodes/base-node";

export function useControllerEditor() {
  const [ref, info] = useRete(createEditor);
  const {
    context,
  } = useEditor();


  useEffect(() => {
    if(!info) return;
      context.addShared("controller-editor", info);

    return () => { 
      context.removeShared("controller-editor");
    }
  }, [info]);

  const execute = () => {
    if(!info?.editor) return;

    const nodes = info.editor.getNodes();
    const connections = info.editor.getConnections();

    const entrypoints = nodes.filter((n) => n instanceof BaseNode && n.node.entrypoint);
    console.log({ nodes });
    entrypoints.forEach((n) => {
      const childrenConnections = connections
        //@ts-ignore
        .filter(c => c.source === n.id && !!nodes.find(n => n.id === c.target)?.node)
        .map(c => {
          const target = nodes.find(n => n.id === c.target)!;

          return {
            //@ts-ignore
            ...target.node,
            value: target.controls.value.value,
          }
        })

        //@ts-ignore
        n.node.execution(childrenConnections);
    });
  };

  return {
    ref,
    execute,
  }
}

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactRenderPlugin<Schemes>({ createRoot });
  const arrange = new AutoArrangePlugin<Schemes>();
  const engine = new DataflowEngine<Schemes>();

  function process() {
    engine.reset();

    editor
      .getNodes()
      .filter((n) => n instanceof BaseOperationNode)
      .forEach((n) => engine.fetch(n.id));
  }

  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([])
  } as any);
  area.use(contextMenu);

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  render.addPreset(Presets.contextMenu.setup() as any);
  render.addPreset(Presets.classic.setup({ 
    area,
    customize: {
      node() {
        return StyledNode
      },
      connection() {
        return StyledConnection
      },
      socket() {
        return StyledSocket
      },
      contextMenu() {
        return StyledSocket
      },
      control: () => StyledControl,
    }
  } as any) as any);

  connection.addPreset(ConnectionPresets.classic.setup());
  arrange.addPreset(ArrangePresets.classic.setup());

  editor.use(engine);
  editor.use(area);
  area.use(connection);
  area.use(render);
  area.use(arrange);

  AreaExtensions.simpleNodesOrder(area);
  AreaExtensions.showInputControl(area);

  editor.addPipe((context) => {
    if (["connectioncreated", "connectionremoved"].includes(context.type)) {
      process();
    }
    return context;
  });

  // const a = new NumberNode(1, process);
  // const b = new NumberNode(1, process);
  // const c = new AddNode(process, (c) => area.update("control", c.id));

  // const con1 = new Connection(a, "value", c, "left");
  // const con2 = new Connection(b, "value", c, "right");

  // await editor.addNode(a);
  // await editor.addNode(b);
  // await editor.addNode(c);

  // await editor.addConnection(con1);
  // await editor.addConnection(con2);

  await arrange.layout();
  AreaExtensions.zoomAt(area, editor.getNodes());

  return {
    process,
    area,
    editor,
    destroy: () => area.destroy()
  };
}