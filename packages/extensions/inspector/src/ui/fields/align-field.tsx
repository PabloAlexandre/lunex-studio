'use client';

import { useEditor } from "@lunex/state"
import { Icon } from "@lunex/icons/src"

const iconSetMap = {
  horizontal: [
    <Icon name="AlignLeftIcon" key="start" size={4} />,
    <Icon name="AlignCenterIcon" key="center" size={4} />,
    <Icon name="AlignRightIcon" key="end" size={4} />
  ],
  vertical: [
    <Icon name="AlignTopIcon" key="start" size={4} />,
    <Icon name="AlignMiddleIcon" key="center" size={4} />,
    <Icon name="AlignBottomIcon" key="end" size={4} />
  ]
}
export function AlignField({
  id,
  title,
  iconSet = 'horizontal'
}: any) {
  const { context } = useEditor();
  const [value, setValue] = context.serializeField(id, 'CENTER')

  const [StartIcon, CenterIcon, EndIcon] = iconSetMap[iconSet as keyof typeof iconSetMap];

  return (
      <div className="items-start flex flex-col mr-8">
        <h4 className="text-xs text-gray-500 uppercase font-bold">{title}</h4>
        <div className="flex mt-4">
          <span className={(value == 'START' ? 'bg-gray-400' : "bg-gray-50 hover:bg-gray-200") + (" mr-2 rounded-md p-1 cursor-pointer")} onClick={() => setValue('START')}>
            { StartIcon }
          </span>
          <span className={(value == 'CENTER' ? 'bg-gray-400' : "bg-gray-50 hover:bg-gray-200") + (" mr-2 rounded-md p-1 cursor-pointer")} onClick={() => setValue('CENTER')}>
            { CenterIcon }
          </span>
          <span className={(value == 'END' ? 'bg-gray-400' : "bg-gray-50 hover:bg-gray-200") + (" mr-2 rounded-md p-1 cursor-pointer")} onClick={() => setValue('END')}>
            { EndIcon }
          </span>
        </div>
      </div>
  )
}