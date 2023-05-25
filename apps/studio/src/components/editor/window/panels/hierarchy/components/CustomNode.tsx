import { useEditor } from "@editor/state";
import { Icon } from "@editor/utils/icons";
import { useState } from "react";

export const CustomNode = ({ testIdPrefix = "", ...props }) => {
  const { id } = props.node;
  const indent = props.depth * 24;
  const [isOpen, setIsOpen] = useState(false);
  const {
    state,
    context,
  } = useEditor();

  const onSelect = () => {
    context.selection.setSelection(id);
    context.inspector.setActive('element');
  }

  const handleToggle = (e: any) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  let className = isOpen || state.selection === id ? "text-rose-300 opacity-100" : "opacity-60"

  return (
    <div
      className={className + " items-center flex h-12 pr-4 rounded-md mb-1 w-full justify-between cursor-grab hover:opacity-100 hover:bg-gray-500/30 transition-opacity duration-150"}
      style={{ paddingInlineStart: indent ? (indent / 2) + 12 : 12 }}
      ref={props.handleRef}
      onClick={onSelect}
      data-testid={`${testIdPrefix}custom-node-${id}`}
    >
      <div className="flex items-center">
        {props.node.hasChildren && (
          <div className={`items-center cursor-pointer flex justify-center w-4 h-4`}>

            <div onClick={handleToggle} className="items-center flex opacity-50">
              <Icon name={props.isOpen ? "TriangleUp" : "TriangleDown"} size={4} />
            </div>
          </div>
        )}


        <h4 className="pl-3 flex items-center">
          <span>{<Icon name={props.node.icon} size={4} className="mr-4 opacity-50" />}</span>
          {props.node.text}
        </h4>
      </div>
      <div className="text-white cursor-pointer">
        <Icon name="EyeIcon" size={4} className="opacity-50" />
      </div>
    </div>
  );
};
