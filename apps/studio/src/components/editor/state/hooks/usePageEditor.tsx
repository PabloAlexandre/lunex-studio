'use client';

import { EditorSerializer, PageNode } from "../editor.types";
import { useChildrenManager } from "./useChildrenManager";
import { v4 as uuid } from 'uuid';


export interface PageEditorProps  {
  items: PageNode[];
  getNode: (id: string) => PageNode;
  attachToParent: (id: string, parentId: string) => void;
  createNode: (node: PageNode, parentId?: string) => void;
  remove: (id: string) => void;
  useTraverse: (fn: any) => PageNode[];
}

export function usePageEditor(state: EditorSerializer): PageEditorProps  {
  const {
    items,
    getFromChildren,
    set,
    getPath,
    setItems,
    remove: baseRemove,
    attachToParent: baseAttachToParent,
    addToParent,  
    addComponent,
  } = useChildrenManager(state);

  function getNode(id: string): PageNode {
    return {} as PageNode;
  }

  function attachToParent(id: string, parentId: string) {
    const node = getNode(id);

    console.log({ node, parentId, parent: getNode(parentId) });
    // baseAttachToParent(node, parentId);
  }

  function createNode(node: PageNode, parentId: string = 'root') {
    node.id = uuid();
    
    addToParent(node, parentId);
  }

  function remove(id: string) {
    baseRemove(id);
  }

  function useTraverse(fn: any) {
    const root = items[0];
    const nodes: PageNode[] = [];

    let lastNode: any = null;

    function read(node = root) {
      const response = fn(node, lastNode);
      
      if(node.childrens) {
        lastNode = node;
        node.childrens.forEach(read);
      }

      nodes.push(response)
    }

    read();
    return nodes;
  }

  return {
    items,
    attachToParent,
    createNode,  
    getNode,
    remove,
    useTraverse,
  }
}