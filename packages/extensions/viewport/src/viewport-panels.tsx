import { useEditor } from "@lunex/state"
import { Panel } from "@lunex/plugins";
import { BaseCodeEditor } from "@lunex/ui"
import { Icon } from "@lunex/icons";

const ListEditor = ({
  buttonText = 'Add Item',
}) => {
  const config = {
    resolution: {
      w: 1920,
      h: 1080,
    },
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <h4 className="text-xs text-gray-500 uppercase font-regular">Default</h4>
        <div className="flex items-center">
          <h4 className="text-xs text-gray-500 uppercase font-regular mr-4">{ config.resolution.w }x{ config.resolution.h}</h4>
          {/* <span className="cursor-pointer" onClick={() => serialize('resolution')({
            w: window.innerWidth,
            h: window.innerHeight,
          })}> */}
          <span className="cursor-pointer">
            <Icon name="DesktopIcon" size={3} className="opacity-50 stroke-red-700" />
          </span>
        </div>
        
      </div>

      <button className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">{buttonText}</button>
    </>
  )
}


const ViewportMenuInspector = () => {
  const { context } = useEditor();
  // const [ css, setCSS ] = context.serializeField('globals.css', '');

  return (
    <div className="">
      <ListEditor buttonText="New Resolution" />
      <div className="mt-8">
        <h4 className="text-xs text-gray-500 uppercase font-regular mb-4">Base CSS</h4>
        <div className="w-full h-48 no-decorative">
          <BaseCodeEditor setValue={(e) => {
            console.log(e);
            // setCSS(e);
          }} language="css" minimap={false} value={""} hideLines  />
        </div>
      </div>  
    </div>
  )
}

const ViewportInspector = Panel.createBasePanel('settings', "GlobeIcon", 'right', {
  title: 'Settings', 
  Component: ViewportMenuInspector
});

const ViewportStructure = Panel.createBasePanel('structure', "StructureIcon", 'left', {
  // title: 'Structure', 
  Component: () => <h1>Project structure</h1>
});

export const ViewportPanels = [
  ViewportInspector,
  ViewportStructure,
]