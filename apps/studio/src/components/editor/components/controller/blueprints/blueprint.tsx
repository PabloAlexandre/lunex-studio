import { Icon } from "@editor/utils/icons";
import { useControllerEditor } from "./editor";

export const Blueprint = () => {
  const { ref, execute } = useControllerEditor();

  return (
    <main className="flex flex-col h-full w-full relative" style={{zIndex: 0,  background: 'url("/grid.webp")', backgroundSize: '8%' }}>
      <div className="absolute left-0 top-0 w-full h-full opacity-80 bg-gray-950 backdrop-blur" ></div>
      <header className="mt-1 px-4 h-16 pt-3 pb-2 w-full bg-white/20 backdrop-blur z-10">
        <ul className="flex h-full items-center justify-start">
          <li className="bg-green-800 hover:bg-green-700 h-full text-white font-bold rounded-sm cursor-pointer justify-between flex items-center px-4 mr-6" onClick={execute}>
            <Icon name="PlayIcon" size={5} className="mr-3"/>
            Execute
          </li>
          <li className="bg-gray-100/20 h-full text-white/20 font-bold rounded-sm select-none justify-between flex items-center px-4 disabled">
            <Icon name="GearIcon" size={5} className="mr-3"/>
            Settings
          </li>
        </ul>
      </header>
      <div ref={ref} className="absolute w-full h-full bg-transparent" style={{  zIndex: 1 }}></div>
    </main>
  )
}