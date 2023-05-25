import { useState } from "react";

export function useSelector() {
  const [ selection, setSelection ] = useState('');

  return {
    selection,
    setSelection,
  }

}