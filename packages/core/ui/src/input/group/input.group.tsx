import { ReactNode } from "react";

export interface InputGroupProps {
  direction?: 'row' | 'column';
  label?: string;
  children?: ReactNode;
  className?: string;
}

export function InputGroup({
  direction = 'row',
  label,
  children,
  className = ''
}: InputGroupProps) {
  let classAttributes = 'flex ';

  if(className) classAttributes += className+ ' ';

  let width = ['w-full', 'w-full'];

  if(direction === 'row') {
    classAttributes += 'items-center ';
    width = ['w-5/12', 'w-7/12'];
  }

  if(direction === 'column') classAttributes += 'flex-col justify-center ';

  if(!label) width = ['w-0', 'w-full'];

  return (
    <fieldset className={classAttributes+" w-full gap-2"}>
      { label && <span className={width[0]+" font-bold text-xs uppercase flex"}>{ label }</span> }
      <div className={width[1]+" flex gap-4"}>{children}</div>
    </fieldset>
  );
}