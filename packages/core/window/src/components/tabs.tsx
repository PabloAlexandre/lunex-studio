import { Tab as TabType } from '../window.context';
import { useWindow } from '../window.hooks';
import { Tab } from './tab';

export function Tabs() {
  const { tabs, activeTab, closeTab, sortTabs, editTab, setActiveTabById } = useWindow();
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    sortTabs(dragIndex, hoverIndex);

    // setCards((prevCards: Item[]) =>
    //   update(prevCards, {
    //     $splice: [
    //       [dragIndex, 1],
    //       [hoverIndex, 0, prevCards[dragIndex] as Item],
    //     ],
    //   }),
    // )
  }

  return (
    <header className="h-12 w-full flex items-center bg-gray-200 dark:bg-gray-900">
      {
        tabs.map((tab: TabType, index: number) => (
          <Tab key={tab.id} index={index} onSort={moveCard} active={tab.id === activeTab} onChange={editTab} onClick={() => setActiveTabById(tab.id)} onClose={() => closeTab(tab.id)} tab={tab}>{tab.title}</Tab>
        ))
      }
    </header>
  )
}
