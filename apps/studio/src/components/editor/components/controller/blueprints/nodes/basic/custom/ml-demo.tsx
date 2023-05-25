import { createBaseNode, createBaseNodeItemCommand, createNode, pipe, withControl, withInputs, withOutputs } from "../../base-node";

/* IMAGE NODE */
const size = {
  width: 200,
  height: 130,
}

const priority = 1000000;

export const ImageNode = pipe(
  withControl([{ type: "text", initial: "http://img.co/test.png" }]),
  withOutputs([{ name: "Image Source" }]),
)(createNode(size.width, size.height, 'image', 'Image'))

createBaseNode(
  createBaseNodeItemCommand("Add Image Source Node", "Create a image source node to your controller", "ImageIcon", priority),
  ImageNode,
  "Money Edition"
);

/* ML NODE */

export const ImageAltGeneratorNode = pipe(
  withInputs([{ name: "Image Source" }]),
  withOutputs([{ name: "Alt Text" }]),
)(createNode(250, 150, 'alt-generator-ml', 'Alt Generator'))

createBaseNode(
  createBaseNodeItemCommand("Image Alt Generator", "Add an image Alt Generator that brings ml power to your image", "ImageIcon", priority-1),
  ImageAltGeneratorNode,
  "Money Edition"
);


/* Debug Node */

export const DebugNode = pipe(
  withInputs([{ name: "Value" }]),
  withControl([{ type: "text", initial: "This picture has a cat and a dog" }]),
)(createNode(200, 150, 'debug', 'Console Log'))

createBaseNode(
  createBaseNodeItemCommand("Print a message", "Simple pretty", "UppercaseIcon", priority-1),
  DebugNode,
  "Money Edition"
);


/* Teraphy Node */

export const TeraphyNode = pipe(
  withInputs([{ name: "Value" }]),
  withControl([{ type: "text", initial: "This picture has a cat and a dog" }]),
)(createNode(200, 150, 'debug', 'Terapia'))

createBaseNode(
  createBaseNodeItemCommand("Go to teraphy", "Simple pretty", "UppercaseIcon", priority-1),
  TeraphyNode,
  "Money Edition"
);