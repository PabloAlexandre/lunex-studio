import { useMemo } from "react";
import { Bounds } from "./types";

interface BaseEditorProps {
  children: React.ReactNode;
  top?: string;
  zIndex?: number;
  bounds: Bounds;
  directionValue?: string;
  direction?: 'bottom' | 'top';
}

export function BaseEditorComponent({
  children,
  bounds,
  directionValue = 'calc(100% + 4px)',
  zIndex = 50,
}: BaseEditorProps) {
  const direction = useMemo(() => document.body.getBoundingClientRect().height - bounds.bottom > 1000 ? 'bottom' : 'top', []);

  const props = direction === 'top' ? {
    bottom: directionValue,
  } : {
    top: directionValue,
  }

  return (
    <div
      style={{ ...props, zIndex, gridTemplateRows: 'auto 1fr auto', minWidth: 550,maxWidth: 850, minHeight: '100%' }}
      className={" grid absolute bg-white w-full px-4 text-black border border-gray-300 drop-shadow-2xl"}
    >
      { children }
    </div>
  )
}