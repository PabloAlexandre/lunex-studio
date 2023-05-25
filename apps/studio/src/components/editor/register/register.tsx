'use client';

import { createContext, useContext, useState } from "react";
import '@editor/components';

import { State, StateValue, Type } from "./types";
import { RegisterStorage, initialState } from "./register-store";

interface RegisterContextProps {
  state: State;
  get: <T>(type: Type, id?: string, cb?: (item: T) => boolean) => StateValue | StateValue[];
}

export const RegisterContext = createContext<RegisterContextProps>({
  state: initialState,
  get: () => { return {} as any; },
});

interface RegisterProps {
  children: React.ReactNode;
}

export function useRegister(){
  const register = useContext(RegisterContext);
  return register;
}

export function Register({ children }: RegisterProps) {
  const [state] = useState<State>(RegisterStorage.getInstance().getState());
  
  function get<T>(type: Type, id?: string, cb?: (item: T) => boolean) {
    if(!id) return state[type];

    return state[type].find(cb || ((i: any) => i.id === id));
  }
  

  return (
    <RegisterContext.Provider value={{
      state,
      get,
    }}>
      {children}
    </RegisterContext.Provider>
  )
};