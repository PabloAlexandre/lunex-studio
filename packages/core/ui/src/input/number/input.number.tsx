import { Input, InputBaseProps } from "../base/input.base";

export interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

function InputNumberImpl ({
  value,
  onChange,
  className,
}: InputNumberProps) {

 return (
    <input type="text" className={className} onChange={(e) => onChange(parseFloat(e.target.value))} value={value} />
 )
}

type Props = InputBaseProps;

export function InputNumber(props: Props) {
  return <Input {...props} component={InputNumberImpl} />;
}
