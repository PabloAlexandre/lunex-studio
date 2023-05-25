interface MyObject {
  id: string;
  childrens?: MyObject[];
}

export function findElementById(arr: MyObject[], id: string): MyObject | null {
  for (const obj of arr) {
    if (obj.id === id) {
      return obj;
    }

    if (obj.childrens) {
      const foundElement = findElementById(obj.childrens, id);
      if (foundElement) {
        return foundElement;
      }
    }
  }

  return null;
}