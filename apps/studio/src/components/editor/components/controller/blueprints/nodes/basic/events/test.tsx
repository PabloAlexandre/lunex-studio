import { createBaseNode, createBaseNodeItemCommand, createNode, pipe, withOutputs, withExecution } from "../../base-node";

export const Event = pipe(
  withOutputs([{ name: "On Start" }]),
  withExecution((items: any[]) => {
    items.forEach(it => {
      it.execution(it);
    })
  }, true)
)(createNode(200, 85, 'event-test', 'On Test'))

createBaseNode(
  createBaseNodeItemCommand("Event Test", "Create a test event for controller", "CodeIcon", 115),
  Event,
);