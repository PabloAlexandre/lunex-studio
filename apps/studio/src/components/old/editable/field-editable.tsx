'use client';

import { MouseEventHandler, ReactNode, cloneElement, createContext, useEffect, useMemo, useRef, useState } from "react";
import { Bounds } from "./subcomponents/types";
import { DebuggerPanel } from "./subcomponents/debugger-panel";
import { EditableOverlay } from "./subcomponents/editable-overlay";
import { useSetRerender, useShouldRerender } from "../cms-provider/cms-provider-client";
import { EditableProvider } from "../editable-provider";


interface FieldEditableProps {
  title?: string;
  id: string;
  hoverId?: string;
  children: ReactNode;
  fixed?: boolean;
  props: {
    color: string;  
    editableComponent?: ReactNode;
    children?: ReactNode;
    [key: string]: any;
  };
}


export function FieldEditable({
  title,
  id,
  children,
  fixed = false,
  props: {
    editableComponent,
    color,
    zIndex = true,
    children: propChildren,
    ...props
  },
}: FieldEditableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldRerender = useShouldRerender();
  const setRerender = useSetRerender();
  const [ visible, setVisible ] = useState(false);
  const [ bounds, setBounds ] = useState<Bounds | undefined>();

  function calculateBounds() {
    if (ref.current) {
      const { width, height, right, left, top, bottom } = ref.current.getBoundingClientRect();
      setBounds({ left, height, right, width, bottom, top: top + window.scrollY });
    }
  }

  useEffect(() => {
    if(!fixed) return;

    function handleScroll() {
      calculateBounds();
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [ fixed ]);

  useEffect(() => {
    calculateBounds();
  }, [ ref, shouldRerender ]);

  function setHover(isHover: boolean) {
    return () => {
      setVisible(isHover);
    }
  }

  const newProps = {
    ...props,
    ref,
  }

  if(propChildren) {
    // @ts-ignore
    newProps.children = propChildren;
  }

  // @ts-ignore
  const newChildren = cloneElement(children, newProps);

  function onEdit(value: any) {
    EditableProvider.getInstance().setField(id, value);
    setRerender();
  }

  return (
    <>
      {/* { bounds && visible && <DebuggerPanel info={bounds} visible={visible} /> } */}

      <div 
        className="relative" 
        onMouseEnter={setHover(true)} 
        onMouseLeave={setHover(false)} 
      >
        <EditableOverlay 
          title={title} 
          bounds={bounds} 
          initialValue={ref.current}
          isVisible={visible}  
          color={color as any}
          zIndex={zIndex}
          onEdit={onEdit}
          editableComponent={editableComponent}
        >
          { newChildren }
        </EditableOverlay>
      </div>
    </>
  )
}