import { EditableProvider } from "../editable-provider";

export function SideMenu() {

  function sync() {
    EditableProvider.getInstance().saveOnCloud();
  }

  return (
    <div className="fixed left-4 top-2/4 -translate-y-2/4 z-60">
      <div className="bg-black h-full w-full rounded-md opacity-60 z-90 flex items-center justify-center backdrop-blur absolute" />
      <ul className="flex flex-col gap-4 relative justify-center align-center w-full h-full p-4 z-60">
        <li className="flex rounded-sm bg-white bg-opacity-10 hover:bg-opacity-30 cursor-pointer p-2 justify-center items-center group/item relative" onClick={sync}>
          <div className="absolute text-black bg-white p-1 text-xs left-full ml-2 rounded-lg bg-opacity-90 px-2 top-2/4 -translate-y-2/4 invisible group-hover/item:visible">Publicar</div>
          <MagicIcon size={5}/>
        </li>
        <li className="flex rounded-sm bg-white bg-opacity-10 hover:bg-opacity-30 cursor-pointer p-2 justify-center items-center group/item relative">
          <div className="absolute text-black bg-white p-1 text-xs left-full ml-2 rounded-lg bg-opacity-90 px-2 top-2/4 -translate-y-2/4 invisible group-hover/item:visible">Visualizar</div>
          <EyeIcon size={5} />
        </li>
        <li className="flex rounded-sm bg-white bg-opacity-10 hover:bg-opacity-30 cursor-pointer p-2 justify-center items-center group/item relative">
          <div className="absolute text-black bg-white p-1 text-xs left-full ml-2 rounded-lg bg-opacity-90 px-2 top-2/4 -translate-y-2/4 invisible group-hover/item:visible">Configurações</div>
          <GearIcon size={5}/>
        </li>
        <li className="flex rounded-sm bg-white bg-opacity-10 hover:bg-opacity-30 cursor-pointer p-2 justify-center items-center group/item relative">
          <div className="absolute text-black bg-white p-1 text-xs left-full ml-2 rounded-lg bg-opacity-90 px-2 top-2/4 -translate-y-2/4 invisible group-hover/item:visible">Voltar</div>
          <LeaveIcon size={5} />
        </li>
      </ul>
    </div>
  )
}