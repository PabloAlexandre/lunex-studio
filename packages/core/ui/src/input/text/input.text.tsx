import { Input, InputBaseProps } from "../base/input.base";

export interface InputTextProps {
  value: number;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

function InputTextImpl ({
  value,
  onChange,
  className,
  placeholder
}: InputTextProps) {

 return (
    <input placeholder={placeholder} type="text" className={className} onChange={(e) => onChange(e.target.value)} value={value} />
 )
}

type Props = InputBaseProps;

export function InputText(props: Props) {
  return <Input {...props} component={InputTextImpl} />;
}
