import { createBaseNode, createBaseNodeItemCommand, createNode, pipe, withControl, withExecution, withInputs } from "../../base-node";


export const Alert = pipe(
  withInputs([{ name: "start" }]),
  withControl([{ type: "Text", initial: "Bliu!" }]),
  withExecution((it: any) => {
    alert(it.value)
  })
)(createNode(200, 125, 'alert', 'Alert'));

createBaseNode(
  createBaseNodeItemCommand("Alert Action", "Create a alert in window", "CodeIcon", 105),
  Alert,
);