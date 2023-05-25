import {
  Tree,
  MultiBackend,
  getBackendOptions,
  DndProvider
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./components/CustomNode";
import { CustomDragPreview } from "./components/CustomDragPreview";
import { Placeholder } from "./components/Placeholder";
import { useEditor } from "@editor/state";



export function HierarchyView() {
  const { pageEditor } = useEditor();

  const handleDrop = (_: any, info: any) => {
    if(!info.dropTarget) return;
    const { dropTarget, dragSource } = info;
  pageEditor.attachToParent(dragSource.id, dropTarget.id);
  }


  function isDroppable(type: string) {
    return true;
  }

  const res = pageEditor.useTraverse((node: any, parent: any) => {
    return  {
      id: node.id,
      parent: parent?.id || 0,
      droppable: isDroppable(node.type),
      hasChildren: node.childrens?.length > 0,
      text: node.title,
      icon: node.icon
    }
  }) as any;

  return (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className="h-full px-4">
        <Tree
          tree={res}
          rootId={0}
          sort={false}
          insertDroppableFirst={false}
          dropTargetOffset={10}
          canDrop={(tree, { dragSource, dropTargetId }) => {
            if (dragSource?.parent === dropTargetId) {
              return true;
            }
          }}
          render={(node, options) => <CustomNode node={node} {...options} />}
          dragPreviewRender={(monitorProps) => (
            <CustomDragPreview monitorProps={monitorProps} />
          )}
          placeholderRender={(node, { depth }) => (
            <Placeholder node={node} depth={depth} />
          )}
          onDrop={handleDrop}
          classes={{
            root: 'box-border relative h-full mt-4',
            draggingSource: 'opacity-30',
            placeholder: 'relative'
          }}
        />
        </div>
    </DndProvider>
  );
}
