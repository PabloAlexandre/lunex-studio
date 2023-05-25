'use client';
import { ReactNode } from "react";

import { useEditor } from "@lunex/state";
import { Icon } from "@lunex/icons";

interface AccordionProps {
  title: string;
  id: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  title,
  children,
  id,
}: AccordionProps) {
  const { context } = useEditor();
  const [ open, setOpen ] = context.serializeField(`accordiondata.${id}`, false);

  const className = open ? 'flex' : 'hidden';

  return (
    <div className="group/accordion border-b border-gray-300 last:border-none" data-active-classes="bg-white dark:bg-gray-900 text-gray-900" data-inactive-classes="text-gray-500 dark:text-gray-400">
      <h2>
        <button onClick={() => setOpen(!open)} type="button" className="flex items-center outline-none justify-between w-full py-4 font-medium text-left text-gray-700" aria-expanded="true">
          <span>{title}</span>
          <Icon name={open ? "ChevronUpIcon" : "ChevronDownIcon"} />
        </button>
      </h2>
      <div className={className+" w-full mb-4"}>
          {
            children
          }
      </div>
    </div>
  )
}