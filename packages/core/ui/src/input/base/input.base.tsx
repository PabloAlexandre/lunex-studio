import { ElementType, ReactNode, useState } from "react";

export interface InputBaseProps {
  label?: string;
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  labelPadding?: boolean;
}

export type InputProps = InputBaseProps & {
  component: ElementType;
  [key: string]: any;
}

export function Input({
  label,
  size = 'medium',
  component: Component,
  leftIcon,
  rightIcon,
  labelPadding = true,
  ...props
}: InputProps) {
  const [ value, setValue ] = useState();
  let sizeClass = size === 'small' ? 'p-0' : size === 'medium' ? 'p-1' : 'p-2';
  let sizes = (label) ? ['w-5/12', 'w-7/12'] : ['w-full', 'w-full'];

  if(!labelPadding) {
    sizes = ['w-auto', 'w-full'];
  }


  if(leftIcon) sizeClass += ' pl-11'
  if(rightIcon) sizeClass += ' pr-11'

  return (
    <fieldset className="w-full flex items-center">
      { label && <label className={sizes[0]+" grow flex text-white dark:text-black font-bold uppercase mr-2"} style={{ fontSize: 11 }}>{ label }</label> }
      <div className={"relative "+sizes[1]}>
        { leftIcon && <div className="absolute top-2/4 -translate-y-2/4 left-1 px-2 w-8 overflow-hidden text-center flex items-center justify-center text-sm border-r border-gray-300">
          { leftIcon }
        </div> }
        <Component onChange={setValue} value={value} className={sizeClass + " text-sm outline-0 flex border border-gray-200 px-2 z-10 rounded-md w-full "} {...props} />
        { rightIcon && <div className="absolute top-2/4 -translate-y-2/4 right-1 px-2 w-8 overflow-hidden text-center flex items-center justify-center text-sm border-l border-gray-300">
          {rightIcon}
        </div> }
      </div>
    </fieldset>
  );
}