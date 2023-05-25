export type SerializeCallback<T> = T | ((value: T) => T);
export type SerializeReturn<T> = [T, (value: SerializeCallback<T>) => void];

export interface PageNode {
  id: string;
  type: string;
  title: string;
  icon: string;
  childrens: PageNode[];
}

interface EditorInfoInspector {
  active: string;
  hide: boolean;
}

interface EditorInfoWindow {
  opened: string;
  windows: string[];
}

export interface EditorInfoFinder {
  filters: Array<{
    field: string;
    values: string[];
  }>
}

export interface EditorInfo {
  selection?: string;
  window: EditorInfoWindow;
  inspector: EditorInfoInspector
  finder: EditorInfoFinder;
  shared: any[];
}

export interface EditorInfoContext {
  selection: {
    id?: string,
    setSelection: (id: string) => void,
  };
  inspector: Pick<EditorInfoInspector, 'active' | 'hide'> & {
    setHide: (val: boolean) => void;
    setActive: (id: string) => void;
  }
  window: Pick<EditorInfoWindow, 'opened'> & {
    openWindow: (id: string) => void;
  }
  finder: Pick<EditorInfoFinder, 'filters'> & {
    setFinderFilter: (filter: { field: string, values: string[]}) => void;
  }
  settings: {
    lock: boolean;
    gizmos: boolean;
    inspector: boolean;
    structure: boolean;
  },
  setSettings: (name: keyof EditorInfoContext['settings'], value: any) => void;
  toggleSettings: (name: keyof EditorInfoContext['settings']) => void;
  getShared: (name: string) => any;
  addShared: (name: string, value: any) => void;
  removeShared: (name: string) => void;
  serializeField: <T>(name: string, initialValue: T) => SerializeReturn<T>;
}

export interface EditorSerializer {
  reset: () => void;
  serialize: <T>(name: string, value: SerializeCallback<T>) => void;
  serializeField: <T>(name: string, initialValue: T) => SerializeReturn<T>;
}

export interface Editor {
  name: string;
  pageEditor: any;
  state: EditorInfo;
  context: EditorInfoContext;
  eventHandler: (cb: (info: EditorInfoContext, payload: any) => void) => void;
}