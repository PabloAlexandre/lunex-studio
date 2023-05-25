import { State, Type } from "./types";

export const initialState: State = {
  windows: [],
  inspectors: [],
  gizmos: [],
  commands: [],
  controllers: [],
}

export class RegisterStorage {
  private static instance: RegisterStorage;
  private state: State = initialState;

  private constructor() { }

  public static getInstance(): RegisterStorage {
    if (!RegisterStorage.instance) {
      RegisterStorage.instance = new RegisterStorage();
    }

    return RegisterStorage.instance;
  }

  register(type: Type, item: any) {
    if(!this.state[type].find((i: any) => i.id === item.id)) {
      this.state[type].push(item);
    }
  }

  get(type: Type) {
    return this.state[type];
  }

  getState() {
    return this.state;
  }
}