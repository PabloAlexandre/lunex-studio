'use client';

import { EditIcon } from "@/components/icons";
import { Bounds } from "./types";
import { createPortal } from "react-dom";
import { cloneElement, useState } from "react";

const colorMap = {
  green: {
    'border': 'border-green-300',
    'bg': 'bg-green-300',
  },
  indigo: {
    'border': 'border-indigo-300',
    'bg': 'bg-indigo-300',
  },
  blue: {
    'border': 'border-blue-300',
    'bg': 'bg-blue-300',
  },
  red: {
    'border': 'border-red-300',
    'bg': 'bg-red-300',
  },
  orange: {
    'border': 'border-orange-300',
    'bg': 'bg-orange-300',
  },
  rose: {
    'border': 'border-rose-300',
    'bg': 'bg-rose-300',
  }
}

interface EditableOverlayProps {
  title?: string;
  isVisible: boolean;
  initialValue?: any;
  bounds?: Bounds;
  editableComponent?: React.ReactNode;
  color: keyof typeof colorMap;
  children?: React.ReactNode;
  zIndex?: boolean;
  onEdit?: (val: any) => void;
}

export function EditableOverlay({
  isVisible,
  title,
  initialValue,
  children,
  bounds,
  zIndex = false,
  onEdit,
  editableComponent,
  color,
}: EditableOverlayProps) {

  const [ isEditing, setIsEditing ] = useState(false);

  function handleEditing() {
    setIsEditing(!isEditing);
  }

  let className = colorMap[color] ? colorMap[color].border : 'border-red-300';
  let bgClassName = colorMap[color] ? colorMap[color].bg : 'bg-red-300';
  const zIndexClass = isEditing && zIndex ? 'z-50' : 'z-10';

  if(isVisible && !isEditing) {
    bgClassName += ' visible';
  } else {
    bgClassName += ' invisible';
  }
  
  if(typeof window === 'undefined') return null;
  const portal = createPortal(
    <>
    { isEditing && <div className={`fixed w-screen h-screen opacity-60 bg-black z-30`} /> }
    <div
      style={{
        height: bounds?.height ? bounds.height + "px" : '100%',
        width: bounds?.width ? bounds.width + "px" : '100%',
        left: bounds?.left ? bounds.left + "px" : '0',
        top: bounds?.top ? bounds.top + "px" : '0',
      }}
      className={`absolute text-white`}
    >
      { 
      
        /* @ts-ignore */
        isEditing && cloneElement(editableComponent, { 
          onClose: () => setIsEditing(false), 
          initialValue,
          bounds: bounds,
          handleChange: (val: any) => {
            if(onEdit) onEdit(val);
            /* @ts-ignore */
            editableComponent.props.handleChange(val)
          }
        }) 
      }
      <div className={`${className} absolute z-40 w-full h-full text-white border-2 pointer-events-none`} />

      <div 
        onClick={handleEditing} 
        className={`${bgClassName} bg-green-300 z-40 cursor-pointer inline-flex px-2 right-0 bottom-0 absolute text-sm font-bold flex items-center justify-center`}
      >
        <EditIcon size={5} className="mr-2" /> Edit {title}
      </div>
    </div>
    </>,
    document.body
  )

  return (
    <>
      { portal }
      <div className={zIndexClass + " relative"}>
        { children }
      </div>
    </>
  )
}