import { findElementById } from "@lunex/utils";
import { v4 as uuid } from 'uuid';
import { EditorSerializer } from "../editor.types";

export function useChildrenManager(serializer: EditorSerializer): any {
  const [ items, setItems ] = serializer.serializeField('content', [{
    id: 'root',
    type: 'page',
    title: "Page",
    icon: "FrameIcon",
    childrens: [],
  }]);

  const getFromChildren = (id: string) => {
    return findElementById(items, id);
  }

  function set(newValue: any, id?: string, {
    toChildren,
    unsetId,
  }: {
    toChildren?: boolean
    unsetId?: string;
  } = {
    toChildren: false,
  }, its: any = items) {
    function updateItems(id: string, node: any, nodes: any[]) {
      return nodes.map((item: any) => {
        if(item.id === id) {
          if(toChildren) {

            if(!item.childrens) {
              item.childrens = [];
            }
            
            item.childrens.push(node);
            return item;
          }
          
          return node;
        }

        if(unsetId == item.id) {
          return null;
        }

      if(item.childrens?.length > 0) {
          item.childrens = updateItems(id, node, item.childrens);
        }

        return item;
      }).filter(it => !!it)
    }

    const newItems = updateItems(id || newValue.id, newValue, its);
    // setItems(newItems);
    return newItems;
  }

  const mapNode = (item: any) => ({
    id: uuid(),
    type: item.id,
    visible: true,
    info: {
      title: item.title,
      category: item.category,
    },
    childrens: []
  });

  function addToParent(node: any, parentId: string) {
    setItems((oldItems: any) => set(node, parentId, {
      toChildren: true,
    }, oldItems));
  }

  function attachToParent(node: any, parentId: string) {
    setItems((oldItems: any) => set(node, parentId, {
      toChildren: true,
      unsetId: node.id,
    }, oldItems));
  }

  function remove(id: string) {
    set(null, id);
    setItems((oldItems: any) => set(null, id, undefined, oldItems));
  }

  function addComponent(item: any){
    // const node = mapNode(item);
    // setItems((oldItems: any) => [...oldItems, node]);
  }

  function getPath(id: string) {
    function get(targetId:string, root = items): any {
      return root.map((item: any) => {
        if(item.id === targetId) {
          return item.id;
        }

        if(item.childrens.length > 0) {
          const items = get(targetId, item.childrens);

          if(items.length > 0) {
            return [item.id, ...items].join('.');
          }
        }

        return null;
      }).flat().filter((it: any) => !!it)
    }

    return get(id)?.[0];
  }

  function setNewItems(items: any[]) {
    const newItems = items.map(({
      component,
      icon,
      ...props
    }) => props);

    setItems(newItems);
  }
  
  return {
    getPath,
    items,
    setItems: setNewItems,
    addComponent,
    getFromChildren,
    set,
    remove,
    addToParent,
    mapNode,
    attachToParent,
  }
}