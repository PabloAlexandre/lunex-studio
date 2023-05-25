'use client';

import { ReactNode, useEffect, useRef, useState, cloneElement } from "react";

interface LinkEditableProps {
  text: string;
  href: string;
  children: ReactNode;
  id: string;
  title?: string;
}


const UpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#888" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
)

const DownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#888" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

const LinkEditPanel = () => (
  <div className="relative rounded-t-md rounded-br-md p-4 bg-white pb-8" style={{ minWidth: 300 }}>
    <div className="flex items-center">
      <label className="uppercase font-bold text-xs text-gray-600 mr-4">Texto</label>
      <input type="text" className="flex w-full border border-gray-300 outline-0 rounded-md p-1 text-sm" />
    </div>
    <br />
    <div className="flex items-center">
      <label className="uppercase font-bold text-xs text-gray-600 mr-8">Link</label>
      <input type="text" className="flex w-full border border-gray-300 outline-0 rounded-md p-1 text-sm" />
    </div>
  </div>
)

export const LinkEditable = ({
  children,
  title,
  id
}: LinkEditableProps) => {
  const [ isEditing, setEditing ] = useState(false);

  // const [ data ] = useState(localStorage?.getItem(`cms.${id}`));
  const ref = useRef<HTMLElement>(null);

  // function handleChange(e: any) {
  //   localStorage.setItem(`cms.${id}`, e.target.innerHTML);
  // }

  function toggleOpen() {
    setEditing(!isEditing);
  }

  const props = {
    ref,
    onClick: () => {
      alert('HERE');
    }
  }

  //@ts-ignore
  //if(data) props.children = data;

  const newChild = cloneElement(children, props);
  const classNames = isEditing ? [
    'visible',
    'rounded-b-md border-t bg-cyan-200'
   ] : [
    'invisible',
    'rounded-md bg-cyan-300'
   ];
  return (
    <div className="z-10 relative group/item">
      <div className={classNames[0]+" text-black absolute group-hover/item:visible right-0 -top-10 pb-4"}>
        <div className={classNames[0]+" bottom-full group-hover/item:visible absolute right-0 w-full"}>
          { isEditing && <LinkEditPanel /> }
        </div>
        <div className={classNames[1] + " cursor-pointer p-2 flex items-center bg-white text-sm"} onClick={toggleOpen}>
          {title || id} 
          <span className="ml-2">
            { isEditing ? <DownIcon /> : <UpIcon /> }</span>
        </div>
      </div>

      { newChild }
    </div>
  )
}