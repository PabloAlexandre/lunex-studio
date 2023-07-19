import { useEditor } from "@lunex/state";
import { Icon } from "@lunex/icons/src";

export const CustomNode = ({ setId, active, testIdPrefix = "", ...props }: any) => {
  const { id } = props.node;
  const indent = props.depth * 24;

  const {
    state,
    context,
  } = useEditor();

  const onSelect = () => {
    setId(id);
  }

  const handleToggle = (e: any) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  let className = active === id ? "hierarchy-active text-white bg-indigo-500" : "item-tab text-gray-100"

  return (
    <div
      className={className+" items-center flex h-10 pr-4 w-full justify-between cursor-grab"}
      style={{ paddingInlineStart: indent ? (((indent / 24) + 1) * 10) : 10 }}
      ref={props.handleRef}
      onClick={onSelect}
      data-testid={`${testIdPrefix}custom-node-${id}`}
    >
      <div className="flex items-center">
        {props.node.hasChildren && (
          <div className={`items-center cursor-pointer flex justify-center w-4 h-4`}>

            <div onClick={handleToggle} className="items-center flex opacity-50">
              <Icon name={props.isOpen ? "TriangleUp" : "TriangleDown"} size={4}/>
            </div>
          </div>
        )}


        <h4 className="flex items-center">
          <span>{<Icon name={props.node.icon} size={4} className="mr-4 ml-3 opacity-50" />}</span>
          {props.node.text}
        </h4>
      </div>
      <div className="text-white cursor-pointer">
        <Icon name="EyeIcon" size={4} className="opacity-50" />
      </div>
    </div>
  );
};
