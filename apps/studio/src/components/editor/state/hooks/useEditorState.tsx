import { useState } from "react";
import { EditorInfo, EditorInfoContext, EditorSerializer } from "../editor.types";
import { set } from "lodash";
import { useSelector } from "./useSelector";

const initialSettings = {
  lock: false,
  gizmos: true,
  inspector: true,
  structure: false,
};

type Settings = typeof initialSettings;
type SettingsKey = keyof typeof initialSettings;

export function useEditorInfo(serializer: EditorSerializer) {
  const {
    selection,
    setSelection,
  } = useSelector();

  const [ settings, setSettings ] = serializer.serializeField<Settings>('editor.settings', initialSettings);

  const [editorInfo, setEditorInfo] = useState<EditorInfo>({
    window: {
      opened: 'viewport',
      windows: ['viewport'],
    },
    inspector: {
      hide: false,
      active: '',
    },
    finder: {
      filters: [],
    },
    shared: [],
  });

  function setEditorField(path: string, value: (info: any) => any) {
    setEditorInfo(info => ({...set(info, path, value(info))}));
  }

  const window = {
    opened: editorInfo.window.opened,
    openWindow: (name: string) => {
      if(editorInfo.window.windows.includes(name)) {
        return setEditorField('window.opened', () => name);
      }

      setEditorField('window.windows', (info) => [
        ...info.window.windows,
        name,
      ]);

      setEditorField('window.opened', () => name);
    },
  };

  const inspector = {
    active: editorInfo.inspector.active,
    hide: editorInfo.inspector.hide,
    setHide: (val: boolean) => {
      setEditorField('inspector.hide', () => val);
    },
    setActive: (id: string) => {
      setEditorField('inspector.active', () => id);
    }
  }

  const finder = {
    filters: editorInfo.finder.filters,
    setFinderFilter,
  }

  function setNewSettings(name: SettingsKey, value: boolean) {
    setSettings((oldSettings: any) => ({
      ...oldSettings,
      [name]: value,
    }));
  }

  function toggleSettings(name: SettingsKey) {
    setSettings((oldSettings: any) => {
      return {
        ...oldSettings,
        [name]: !oldSettings[name],
      }
    });
  }


  function setFinderFilter(filter: { field: string, values: string[] }) {
    setEditorField('finder.filters', (oldIt = []) => [...oldIt, filter]);
  }

  function addShared(name: string, value: any) {
    setEditorField('shared', (oldIt) => [...oldIt.shared, { name, value }]);
  }

  function getShared(name: string) {
    return editorInfo.shared.find((it) => it.name === name)?.value;
  }

  function removeShared(name: string) {
    setEditorField('shared', (oldIt) => oldIt.shared.filter((it: any) => it.name !== name));
  }
  
  const editorInfoContext: EditorInfoContext = {
    window,
    selection: {
      id: selection,
      setSelection,
    },
    inspector,
    settings,
    toggleSettings,
    finder,
    setSettings: setNewSettings,
    addShared,
    removeShared,
    serializeField: serializer.serializeField.bind(serializer),
    getShared,
  }

  return {
    editorInfo: {
      ...editorInfo,
      selection: selection,
    },
    settings, 
    setSelection,
    setSettings,
    editorContext: editorInfoContext,
  }
}