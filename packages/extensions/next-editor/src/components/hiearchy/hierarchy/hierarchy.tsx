import {
  Tree,
  DndProvider
} from "@minoru/react-dnd-treeview";
import { useEditor } from "@lunex/state";

import { CustomNode } from "./components/CustomNode";
import { CustomDragPreview } from "./components/CustomDragPreview";
import { Placeholder } from "./components/Placeholder";
import { IconKeys } from "@lunex/icons/src";
import { useState } from "react";


const PageMock = [{
  icon: "FrameIcon",
  id: "root",
  text: "Page",
  type: "page",
  parent: 0,
  droppable: true,
  hasChildren: true,
}, {
  id: "container",
  parent: "root",
  droppable: true,
  hasChildren: true,
  text: "Container",
  icon: "DivIcon",
}, {
  id: "left-panel",
  parent: "container",
  droppable: true,
  hasChildren: true,
  text: "Left Panel",
  icon: "SpanIcon",
}, {
  id: "text",
  parent: "left-panel",
  droppable: false,
  hasChildren: false,
  text: "Text",
  icon: IconKeys.UppercaseIcon,
},{
  id: "text-2",
  parent: "left-panel",
  droppable: false,
  hasChildren: false,
  text: "Text Two",
  icon: IconKeys.LowercaseIcon,
}, {
  id: "right-panel",
  parent: "container",
  droppable: true,
  hasChildren: true,
  text: "Right Panel",
  icon: "SpanIcon",
}, {
  id: "text-3",
  parent: "right-panel",
  droppable: false,
  hasChildren: false,
  text: "Text 3",
  icon: IconKeys.UppercaseIcon,
}, {
  id: "text-4",
  parent: "right-panel",
  droppable: false,
  hasChildren: false,
  text: "Text 4",
  icon: IconKeys.LowercaseIcon,
}]

export function HierarchyView() {
  const { pageEditor } = useEditor();
  const [ active, setActive ] = useState('');

  console.log({ pageEditor });
  console.log('HERE');

  const handleDrop = (_: any, info: any) => {
    if(!info.dropTarget) return;
    const { dropTarget, dragSource } = info;
    pageEditor.attachToParent(dragSource.id, dropTarget.id);
  }


  function isDroppable(type: string) {
    return true;
  }

  // const res = pageEditor.useTraverse((node: any, parent: any) => {
  //   return  {
  //     id: node.id,
  //     parent: parent?.id || 0,
  //     droppable: isDroppable(node.type),
  //     hasChildren: node.childrens?.length > 0,
  //     text: node.title,
  //     icon: node.icon
  //   }
  // }) as any;

  const res = PageMock as any;
  
  console.log({ active });
  return (
    <div className="h-full px-4 py-2">
      {/* <div className="relative">
        <input name="search" placeholder="Search" className="w-full bg-gray-800 outline-0 h-10 border border-gray-500 text-sm rounded-md rounded-sm px-2 my-3" />
        <Icon name="SearchIcon" size={5} className="absolute top-2/4 -translate-y-2/4 right-2 text-gray-500 cursor-pointer" />
      </div> */}
      <Tree
        tree={res}
        rootId={0}
        sort={false}
        insertDroppableFirst={false}
        dropTargetOffset={10}
        onChangeOpen={(props: any, ...args: any) => {
          console.log({ props, args });
        }}
        canDrop={(tree, { dragSource, dropTargetId }) => {
          if (dragSource?.parent === dropTargetId) {
            return true;
          }
        }}
        render={(node, options) => <CustomNode setId={setActive} active={active} node={node} {...options} />}
        dragPreviewRender={(monitorProps) => (
          <CustomDragPreview monitorProps={monitorProps} />
        )}
        placeholderRender={(node, { depth }) => (
          <Placeholder node={node} depth={depth} />
        )}
        listComponent={(props => {
          return (
            <ul className="hierarchy">
              { props.children?.[0] }
            </ul>
          )
        })}
        onDrop={handleDrop}
        classes={{
          root: 'box-border relative h-full',
          container: 'opacity-50',
          draggingSource: 'opacity-30',
          placeholder: 'relative'
        }}
      />
    </div>
  );
}
