'use client';

import { ReactNode, cloneElement, useEffect, useMemo, useRef, useState } from "react";

const colorMap = {
  green: {
    'border': 'border-green-300',
  },
  indigo: {
    'border': 'border-indigo-300',
  },
  blue: {
    'border': 'border-blue-300',
  },
  red: {
    'border': 'border-red-300',
  },
  orange: {
    'border': 'border-orange-300',
  },
  rose: {
    'border': 'border-rose-300',
  }
}

interface Position {
  right?: string;
  left?: string;
  top?: string;
  bottom?: string;
  width: string;
  height: string;
}

interface DebugOptions {
  removePadding?: boolean;
}

interface DebuggerProps {
  color: keyof typeof colorMap;  
  children: ReactNode;
}

export function Debugger({
  children,
  color,
}: DebuggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ visible, setVisible ] = useState(false);
  const [ isEditing, setEditing ] = useState(false);
  const [ childrenVisible, setChildrenVisible ] = useState(false);
  const [ options, setOptions ] = useState<DebugOptions>({});

  const [ rect, setRect ] = useState<Position>({
    width: "auto",
    height: "auto",
  });

  let className = colorMap[color] ? colorMap[color].border : 'border-red-300';

  useEffect(() => {
    if (ref.current) {
      
      setTimeout(() => {
        if (!ref.current) return;

        let { width, height, left, top, bottom, right } = ref.current.getBoundingClientRect();

        if(options.removePadding) {
        }

        setRect({
          width: Math.ceil(width)+"px",
          height: Math.ceil(height)+"px",
          left: Math.ceil(left)+"px",
          top: Math.ceil(top)+"px",
          bottom: Math.ceil(bottom)+"px",
          right: Math.ceil(right)+"px",
        });
      }, 100)
      
    }
  }, [ ref, options ]);

  function toggleOpen() {
    setEditing(!isEditing);
  }

  function setHover(isHover: boolean) {
    return () => {
      setVisible(isHover);
    }
  }

  // @ts-ignore
  const newChildren = cloneElement(children, {
    ref,
  });

  className += (isEditing || childrenVisible) ? ' border-2' : '';

  const CheckboxComponent = ({
    onOptionChange
  }: {
    onOptionChange: (optionName: string) => (value: any) => void
  }) => {
    const [ checked, setChecked ] = useState(false);

    function handleChange() {
      const newValue = !checked;
      setChecked(newValue);
      onOptionChange('removePadding')(newValue);
    }


    return (
      <div>
        <label>Remove Padding</label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
      </div>
    )
  }

  function onOptionChange(optionName: string) {
    return (value: any) => {
      setOptions({
        ...options,
        [optionName]: value,
      });
    }
  }
  
  return (
    <div className="z-10 relative pl-2 pt-2 w-full h-full">
      <div 
        onMouseEnter={setHover(true)} 
        onMouseLeave={setHover(false)}  
        // ref={ref}
        className={className + " absolute w-full h-full border-2 p-4 left-0 top-0 "+className} 
      >
        <div className="absolute right-0 bottom-0 bg-white rounded-md text-black text-xs p-1">
          <CheckboxComponent onOptionChange={onOptionChange} />
          {`w: ${rect.width} | h: ${rect.height} | l: ${rect.left} | t: ${rect.top} | b: ${rect.bottom} | r: ${rect.right}` } 
        </div>
      </div>
      
      { newChildren }
    </div>
  )
}