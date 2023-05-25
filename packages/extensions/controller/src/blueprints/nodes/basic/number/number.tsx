import { createBaseNode, createBaseNodeItemCommand, createNode, pipe, withControl, withOutputs } from "../../base-node";

export const Number = pipe(
  withOutputs([{ name: "Number" }]),
  withControl([{ type: "number", initial: 0 }]),
)(createNode(180, 120, 'number', 'Number'))

createBaseNode(
  createBaseNodeItemCommand("Add Number Node", "Create a number node to your controller", "NumberIcon", 110),
  Number,
);
