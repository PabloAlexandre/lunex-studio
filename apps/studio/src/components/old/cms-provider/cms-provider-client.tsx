'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { SideMenu } from "../side-menu/side-menu";
import { EditableProvider } from "../editable-provider";

const RerenderContext = createContext({
  shouldRerender: false,
  setRerender: (a: boolean) => {},
});

export function useShouldRerender() {
  const a = useContext(RerenderContext);
  return a.shouldRerender;
}

export function useSetRerender() {
  const a = useContext(RerenderContext);

  return () => {
    a.setRerender(true);

    setTimeout(() => {
      a.setRerender(false);
    }, 10);
  }
}

export function useCmsState(id: string) {
  const [ state, setState ] = useState(EditableProvider.getInstance().getValue(id));

  useEffect(() => {
    setTimeout(() => {
      setState(EditableProvider.getInstance().getValue(id));
    }, 10);
  }, []);

  return {
    value: state,
    setValue: setState,
  };
}

export function CMSProviderClient({
  children,
  id,
}: any) {
  const [ shouldRerender, setRerender ] = useState(false);

  useEffect(() => {
    if(id) {
      EditableProvider.getInstance().setId(id);
    }

    EditableProvider.getInstance().setEditable(true);
    EditableProvider.getInstance().loadFromLocalStorage();

    setRerender(true);

    setTimeout(() => {
      setRerender(false);
    }, 10);
  }, []);

  return (
    <RerenderContext.Provider value={{ shouldRerender, setRerender }}>
      <SideMenu />
      { children }
    </RerenderContext.Provider>
  )
}