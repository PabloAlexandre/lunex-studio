import { useContext } from "react";
import { WindowContext, WindowContextProps } from "./window.context";

export function useWindow(): WindowContextProps {
  const val = useContext(WindowContext);
  if(!val) throw new Error('useWindow must be used within a WindowProvider')
  return val;
}