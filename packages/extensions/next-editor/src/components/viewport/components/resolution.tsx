import { Icon } from "@lunex/icons/src";


const ResolutionValues = ({ size }: any) => (
  <div className="flex items-center justify-between relative">
    <input type="number" className="border border-gray-300 z-10 rounded-md p-1 px-2 w-20" value={size.w}/>
    <span className="mx-3 text-sm text-gray-400 font-bold">X</span>
    <input type="number" className="border border-gray-200 bg-gray-200 z-10 rounded-md p-1 px-2 w-20" value={size.h} disabled />
  </div>
)

export function Resolution({ size }: any) {
  return (
    <div className="absolute top-6 rounded-full text-2xl left-2/4 -translate-x-2/4 py-3 px-4 bg-white text-gray-400 z-10 flex justify-between items-center">
      <span className="flex items-center font-bold uppercase text-xs text-gray-400 mr-8"><Icon name="DesktopIcon" className="mr-2 text-gray-700" size={6} /> Viewport</span>
      <ResolutionValues size={size} /> 
      <span className="ml-6 mr-3 flex items-center">
        <Icon name="GearIcon" size={6} className="mr-4" />
        <Icon name="GlobeIcon" size={6} className="mr-4" />
        <Icon name="PageIcon" size={6} className="mr-4" />
        <Icon name="FigmaIcon" size={6} className="mr-4" />
        <Icon name="CodeIcon" size={6}  />
      </span>
    </div>
  )
}