'use client';

import { useRef, useEffect } from "react";

export function useClickOutside(fn: any, initialRef: HTMLDivElement | null = null, parentRef: any = null) {
  const ref = useRef<HTMLDivElement>(initialRef);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        fn();
      }
    }

    (parentRef?.current || document).addEventListener("mousedown", handleClickOutside);
    
    return () => {
      (parentRef?.current || document).removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return ref;
}
