import { useClickOutside } from "@lunex/utils";
import { Icon } from "@lunex/icons";
import { createPortal } from "react-dom";

const PRIMITIVES = [{
  title: "Div",
  type: "div",
  icon: "DivIcon",
}, {
  title: "Span",
  type: "span",
  icon: "SpanIcon",
}, {
  title: "Link",
  type: "link",
  icon: "LinkIcon",
}, {
  title: "Code",
  type: "code",
  icon: "CodeIcon",
}];

interface ComponentViewProps {
  onClose: () => void;
  onSelect: (item: any) => void;
}

const ComponentViewImpl = ({
  onClose,
  onSelect,
}: ComponentViewProps) => {
  const ref = useClickOutside(() => {
    onClose();
  });

  return (
    <>
      <div className="fixed h-full w-full top-0 left-0 bg-black opacity-70" style={{ zIndex: 200000 }} />
      <div ref={ref} className="absolute p-4  h-2/4 bg-white dark:bg-gray-800 rounded-md text-black drop-shadow-2xl top-0" style={{ zIndex: 200001, minWidth: 450, left: '14%', top: '10%' }}>
        <h1 className="font-extrabold dark:text-gray-200 text-gray-600 mb-6">Add Components</h1>
        <span className="absolute left-0  w-full block bg-gray-200" style={{height: 1}} />
        <div className="grid grid-cols-3 gap-6 pt-8 px-2">
          {
            PRIMITIVES.map((it) => (
              <div onClick={() => onSelect(it)} key={it.type} className="p-4 py-6 border border-gray-600 bg-transparent text-black dark:text-white rounded-md aspect-square flex flex-col justify-between items-center hover:border-indigo-400 cursor-pointer dark:hover:bg-gray-700 transition-border">
                <Icon name={it.icon as any} size={6} />
                <span className="font-bold text-sm text-gray-300">{ it.title }</span>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export const ComponentView = (props: any) => createPortal(<ComponentViewImpl {...props} />,
  document.body,
)