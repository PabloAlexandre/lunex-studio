'use client';
import { get, set } from "@lunex/utils";
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
        data = set<T>(oldValue, name, (value as (oldValue: T) => T)(get<any>(oldValue, name, initialValue))) as T;
      } else {
        data = set<T>(oldValue, name, value);
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({...data}));

      return {
        ...data,
      };
    });
  }

  function serializeField<T>(name: string, initialValue: T) {
    const value = get<T>(config, name, initialValue);

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

