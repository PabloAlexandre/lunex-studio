import { createBaseNode, createBaseNodeItemCommand, createNode, pipe, withDataHandler, withInputs, withOutputs } from "../../base-node";

const handler = (inputs: { left?: number[]; right?: number[] }, {
  baseInputs,
  controls,
  update,
}: any): { value: number } => {
  const leftControl = baseInputs.left?.control as { value: number };
  const rightControl = baseInputs.right as { value: number };

  const { left, right } = inputs;
  const value =
    (left ? left[0] : leftControl.value || 0) +
    (right ? right[0] : rightControl.value || 0);

  controls.value.setValue(value);
  if (update) update(controls.value);

  return { value };
}

export const SumOperation = pipe(
  withOutputs([{ name: "Number" }]),
  // Needs to add control to inputs
  withInputs([{ name: "Left" }, { name: "Right" }]),
  withDataHandler(handler),
)(createNode(180, 190, 'number', 'Number'))

createBaseNode(
  createBaseNodeItemCommand("Add Sum Node", "Create a sum node operation to your controller", "AddIcon", 100),
  SumOperation,
);
