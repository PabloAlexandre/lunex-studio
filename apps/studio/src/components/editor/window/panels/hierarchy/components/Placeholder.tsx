
export const Placeholder = (props: any) => (
  <div
    className="bg-rose-100 right-0 absolute top-0 -translate-y-2/4 bottom-0"
    style={{ left: props.depth * 24, height: 2 }}
    data-testid="placeholder"
  ></div>
);
