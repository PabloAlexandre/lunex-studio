import { createBaseNode, createBaseNodeItemCommand, createNode, pipe, withComponent, withDataHandler, withExecution, withInputs } from "../../base-node";
import { Presets } from "rete-react-render-plugin";
import { StyledSocket, nodeStyle } from "../../../styles";
import { ClassicPreset } from "rete";

const socket = StyledSocket;

const JSONMapper = (props: any) => {
  console.log({ props });
  return (
    <Presets.classic.Node styles={() => nodeStyle} {...props} />
  )
}

function handler(input: any, fields: any) {
  console.log("HERE");
  
  try {
    const value = JSON.parse(input?.json?.[0])
    const v = Object.entries(value).map(([key, value]) => ({
      title: key,
      value: value,
    }));

    if(input?.json?.[0]) {
      v.forEach(it => {
        fields.addOutput(it.title.toLowerCase(), new ClassicPreset.Output(socket, it.title))
      });
    } 
  } catch(err) {
    console.log("HERREREEER");
    console.log(err);
  }
}
const JSONMapperProperties = pipe(
  withInputs([{ name: "Object" }]),
  withComponent(JSONMapper),
  withExecution((items: any[]) => {}, true),
  withDataHandler(handler)
)(createNode(200, 185, 'json-mapper', 'JSON Mapper'))


createBaseNode(
  createBaseNodeItemCommand("JSON Mapper", "Map your JSON response", "CodeIcon", 110),
  JSONMapperProperties
);