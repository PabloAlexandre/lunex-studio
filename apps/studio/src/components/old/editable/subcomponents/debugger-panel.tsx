import { Bounds } from "./types";

interface DebuggerPanelProps {
  info: Bounds | null;
  visible: boolean;
}

export function DebuggerPanel({
  info,
  visible,
}: DebuggerPanelProps) {

  if(!info || !visible) {
    return null;
  }

  return (
    <div className="fixed z-30 right-0 bottom-0 bg-white text-black">
      { 
        Object.entries(info).map(([key, value]: any) => (
          <p key={key}><strong>{ key }</strong>: { value } </p>
        ))
      }
    </div>
  )
}