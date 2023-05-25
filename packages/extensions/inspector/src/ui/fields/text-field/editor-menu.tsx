import { Icon } from "@lunex/icons";

export type InlineStyles = 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKETHROUGH' | 'UPPERCASE' | 'LOWERCASE' | 'LETTERCASE';

interface EditorMenuProps {
  onSetStyle: (style: InlineStyles) => () => void;
  enabledKeys: Set<InlineStyles>;
}

export const EditorMenu = ({
  onSetStyle,
  enabledKeys,
}: any) => {
  const activeClass = 'bg-gray-200';
  return (
    <div className="inline-flex items-center">

      <span className={ (enabledKeys.has('LINK') ? activeClass : 'hover:bg-gray-100') + " relative group/link inline-flex cursor-pointer p-1 rounded-sm mr-2"} onClick={onSetStyle('LINK')}>
        <Icon name="LinkIcon" color="black" size={4}/>
        <div className="group-hover/link:visible hover:visible z-100 absolute top-full right-0 p-4 invisible bg-white w-32 border border-red-300">
          Link:
          <br />
          Text:
        </div>
      </span>

      <span className="inline-flex h-full opacity-10 mr-2 bg-black" style={{ width: 1}}>
        &nbsp;
      </span>

      <span className={ (enabledKeys.has('ITALIC') ? activeClass : 'hover:bg-gray-100') + " inline-flex cursor-pointer p-1 rounded-sm mr-2"} onClick={onSetStyle('ITALIC')}>
        <Icon name="ItalicIcon" color="black" size={4}/>
      </span>
      <span className={ (enabledKeys.has('BOLD') ? activeClass : 'hover:bg-gray-100') + " inline-flex cursor-pointer p-1 rounded-sm mr-2"} onClick={onSetStyle('BOLD')}>
        <Icon name="BoldIcon" color="black" size={4}/>
      </span>
      <span className={ (enabledKeys.has('UNDERLINE') ? activeClass : 'hover:bg-gray-100') + " inline-flex cursor-pointer p-1 rounded-sm mr-2"} onClick={onSetStyle('UNDERLINE')}>
        <Icon name="UnderlineIcon" color="black" size={4}/>
      </span>
      <span className={ (enabledKeys.has('STRIKETHROUGH') ? activeClass : 'hover:bg-gray-100') + " inline-flex cursor-pointer p-1 rounded-sm mr-2"} onClick={onSetStyle('STRIKETHROUGH')}>
        <Icon name="StrikethroughtIcon" color="black" size={4}/>
      </span>
      <span className="inline-flex cursor-pointer hover:bg-gray-100 p-1 rounded-sm mr-2" onClick={onSetStyle('UPPERCASE')}>
        <Icon name="UppercaseIcon" color="black" size={4}/>
      </span>
      <span className="inline-flex cursor-pointer hover:bg-gray-100 p-1 rounded-sm mr-2" onClick={onSetStyle('LOWERCASE')}>
        <Icon name="LowercaseIcon" color="black" size={4}/>
      </span>
      <span className="inline-flex cursor-pointer hover:bg-gray-100 p-1 rounded-sm mr-2" onClick={onSetStyle('LETTERCASE')}>
        <Icon name="LettercaseIcon" color="black" size={4}/>
      </span>
      
      {/* <span className="inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-sm mr-2">
        <AlignLeftIcon color="black" size={4}/>
      </span>
      <span className="inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-sm mr-2">
        <AlignCenterIcon color="black" size={4}/>
      </span>
      <span className="inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-sm mr-2">
        <AlignRightIcon color="black" size={4}/>
      </span>
      <span className="inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-sm mr-2">
        <AlignJustifyIcon color="black" size={4}/>
      </span> */}
    </div>
  )
}