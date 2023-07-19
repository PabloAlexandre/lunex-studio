import { createContext } from "react";
import { useEditor } from '@lunex/state/src';
import { IconName } from "@lunex/icons/src";
import { v4 as uuid } from 'uuid';
import { useHotkeys } from "@lunex/utils/src";

export interface Tab {
  isEditable: boolean;
  canClose: boolean;
  title: string;
  id: string;
  type: string;
  info: any;
  icon: IconName;
}

type CreateTab = Omit<Tab, 'id'>;

export interface WindowContextProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTabById: (tab: string) => void;
  createTab: (tab: Tab) => void;
  closeTab: (tab: string) => void;
  closeAll: () => void;
  getTab: (tabId: string) => Tab | undefined;
  editTab: (tab: Tab) => void;
  sortTabs: (dragIndex: number, hoverIndex: number) => void;
}

export const WindowContext = createContext<WindowContextProps>({
  tabs: [],
  activeTab: "about-lunex",
  setActiveTabById: () => {},
  createTab: () => {},
  closeTab: () => {},
  closeAll: () => {},
  getTab: () => undefined,
  editTab: () => {},
  sortTabs: () => {},
});

export function useInternalWindow() {
  const { context } = useEditor();

  const [ tabs, setTabs ] = context.serializeField<Tab[]>('windows.tabs', []);
  const [ activeTab, setActiveTab ] = context.serializeField<string>('windows.activeTab', '');

  useHotkeys('ctrl+r', () => {
    setTabs([]);
  });

  function setActiveTabById(id: string) {
    setActiveTab(id);
  }

  function createTab(tab: CreateTab) {
    const targetTab = {
      ...tab,
      id: uuid(),
    }

    setTabs((oldTabs: Tab[]) => {

      return [
        ...oldTabs,
        targetTab,
      ]
    });
  }

  function closeTab(id: string) {
    setTabs((oldTabs: Tab[]) => {
      const index = oldTabs.findIndex((tab) => tab.id === id);
      const newTabs = oldTabs.filter((tab) => tab.id !== id);

      setActiveTab(newTabs[Math.max(index - 1, 0)]?.id);
      return newTabs;
    });

  }

  function findTab(fn: (tab: Tab) => boolean) {
    return tabs.find(fn);
  }

  function closeAll() {
    setTabs([]);
  }

  function editTab(tab: Tab) {
    setTabs((oldTabs: Tab[]) => {
      const index = oldTabs.findIndex((t) => t.id === tab.id);
      const newTabs = oldTabs.filter((t) => t.id !== tab.id);

      newTabs.splice(index, 0, tab);

      return newTabs;
    });
  }

  function sortTabs(dragIndex: number, hoverIndex: number) {
    setTabs((oldTabs: Tab[]) => {
      const dragTab = oldTabs[dragIndex];
      const newTabs = oldTabs.filter((t) => t.id !== dragTab.id);

      newTabs.splice(hoverIndex, 0, dragTab);

      return newTabs;
    });
  }

  function getTab(tabId: string) {
    return tabs.find((tab: Tab) => tab.id === tabId);
  }

  return {
    tabs: tabs || [],
    activeTab,
    setActiveTabById,
    createTab,
    closeTab,
    findTab,
    editTab,
    getTab,
    sortTabs,
    closeAll,
  }
}