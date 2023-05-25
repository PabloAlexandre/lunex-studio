export const CustomDragPreview = (props: any) => {
  const item = props.monitorProps.item;

  return (
    <div className="items-center text-white bg-rose-500 opacity-20 border-sm inline-flex text-sm py-1 px-4 pointer-events-none" data-testid="custom-drag-preview">
      {item.text}
    </div>
  );
};
