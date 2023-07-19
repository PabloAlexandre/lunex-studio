import { useEffect, useRef, useState } from "react";
import { Tab } from "../window.context";
import { useDrag, useDrop } from "react-dnd";
import { Icon } from "@lunex/icons/src";

interface TabProps {
  children?: string;
  tab: Tab;
  active: boolean;
  onClick: () => void;
  onClose: () => void;
  onSort: (dragIndex: number, hoverIndex: number) => void;
  onChange: (value: Tab) => void;
  index: number;
}

function selectElementContents(el: any) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();

  if(!sel) return;

  sel.removeAllRanges();
  sel.addRange(range);
}

function handleClickOutside(e: any) {
  if (e.target && !e.target.contains(e.target)) {
    e.target.blur();
  }
}

function onKeydown(e: any, tab: Tab) {
  return ({ key }: any) => {
    if(key === 'Enter') {
      e.target.blur();
      return;
    }

    if(key === 'Escape') {
      e.target.innerText = tab.title;
      e.target.blur();
    }
  }
}

interface DragItem {
  index: number
  id: string
  type: string
}

export function Tab({ index, onSort, onClick, onClose, onChange, active, tab, children }: TabProps) {
  const className = active ? 'border-t-2 dark:bg-gray-800' : 'dark:bg-gray-900';
  const [ editing, setEditing ] = useState(false);
  const [ opacity, setOpacity ] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const [ releaseDrag, setReleaseDrag ] = useState(false);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: any }
  >({
    accept: 'tab',
    collect(monitor) {
      return {
        handlerId: tab.id
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientX = (clientOffset as {x: number}).x - hoverBoundingRect.left

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }

      onSort(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'tab',
    item: () => {
      return { id: tab.id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  function makeEditable(e: any) {
    if(!tab.isEditable) return;

    e.preventDefault();
    e.stopPropagation();

    setEditing(true);

    e.target.addEventListener("keydown", onKeydown(e, tab))

    setTimeout(() => e.target.focus(), 0);
    document.addEventListener("mousedown", handleClickOutside);
    selectElementContents(e.target);
  }

  function onEdit(e: any) {
    const newTab = {
      ...tab,
      title: e.target.innerText,
    }
    
    onChange(newTab);
    setEditing(false);
  }

  drag(drop(ref))

  useEffect(() => {
    if(!isDragging && releaseDrag) {
      setOpacity(0);
      setTimeout(() => {
        setOpacity(1);
        setReleaseDrag(false);
      }, 0);
    } 

    if(isDragging && !releaseDrag) {
      setReleaseDrag(true);
      setOpacity(0.3);
    }

  }, [ isDragging ]);

  return (
    <div ref={ref} onClick={onClick} className={className + " relative h-full flex items-center text-left py-3 pl-4 pr-11 text-sm border-x border-x-gray-800 border-t-sky-300  dark:text-gray-300 group/tab"}  style={{ opacity, boxShadow: '0 3px 24px 0 rgba(0,0,0, 0.5)' }}>
      
      <span onBlur={onEdit} onDoubleClick={makeEditable} className='flex items-center justify-center'>
        <Icon name={tab.icon} size={4} className='mr-2' />

        <span contentEditable={editing}>{ children }</span>
        <span  className="relative ml-2 opacity-30" style={{ fontSize: 10, top: 2 }}>
          Editor
        </span>
      </span>
      { tab.canClose && <span onClick={onClose} className="cursor-pointer absolute transition-opacity hover:bg-white/10 opacity-70 p-1 rounded-sm right-3 group-hover/tab:visible invisible">
        <Icon name="CloseIcon" size={3} />
      </span> }
    </div>
  )
}