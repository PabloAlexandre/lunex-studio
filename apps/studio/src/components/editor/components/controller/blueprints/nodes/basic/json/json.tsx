import { BaseCodeEditor } from "@/components/code-editor";
import { createBaseNode, BaseNodeComponent, createBaseNodeItemCommand, createNode, pipe, withOutputs, withExecution, withComponent, withControl } from "../../base-node";

const AddJSONNode = (props: any) => (
  <BaseNodeComponent props={props} component={({ value, setValue }: any) => (
    <BaseCodeEditor language="json" hideLines minimap={false} setValue={setValue} value={value} />
  )} />
)

export const JSON = pipe(
  withOutputs([{ name: "Object" }]),
  withControl([{ type: "json", initial: "{}" }]),
  withComponent(AddJSONNode, true),
  withExecution((items: any[]) => {
  }, true)
)(createNode(250, 280, 'json', 'JSON'))

createBaseNode(
  createBaseNodeItemCommand("Add JSON Node", "Create a json node to your controller", "CodeIcon", 110),
  JSON,
);