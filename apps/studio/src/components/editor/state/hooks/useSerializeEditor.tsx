'use client';
import set from "lodash/set";
import getLodash from "lodash/get";
import { useState } from "react";
import { EditorSerializer, SerializeCallback, SerializeReturn } from "../editor.types";

export function useSerializeEditor<T>(name: string, initialState?: T): EditorSerializer {
  const LOCAL_STORAGE_KEY = `lunex.editor.${name}`;
  const [ config, setConfig ] = useState(localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string) : (initialState || {}));
  
  function reset() {
    setConfig(initialState);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  function serialize<T>(name: string, value: SerializeCallback<T>, initialValue?: T) {
    setConfig((oldValue: T) => {
      let data;
      
      if(typeof value === "function") {
        data = set(oldValue as object, name, (value as (oldValue: T) => T)(getLodash(oldValue as object, name, initialValue as any))) as T;
      } else {
        data = set(oldValue as object, name, value) as T;
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({...data}));

      return {
        ...data,
      };
    });
  }

  function serializeField<T>(name: string, initialValue: T) {
    const value = getLodash(config, name, initialValue) as T;

    return [ value, (value: SerializeCallback<T>) => {
      serialize(name, value, initialValue);
    }] as SerializeReturn<T>;
  }


  return {
    reset,
    serialize,
    serializeField,
  }
}

