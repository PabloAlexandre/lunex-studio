import { Input, InputBaseProps } from "../base/input.base";

export type InputSelectProps = {
  options?: string[];
  value: string,
  onChange: (value: string) => void,
  className?: string;
};

export function InputSelectImpl({
  value,
  options,
  onChange,
  className,
}: InputSelectProps) {
  return (
    <select className={`${className} bg-gray-50`} onChange={(e: any) => onChange(e.target.value)} value={value}>
      {
        options?.map((option) => <option>{option}</option>)
      }
    </select>
  );
}

type Props = InputBaseProps & {
  options?: string[];
};

export function InputSelect(props: Props) {
  return <Input {...props} component={InputSelectImpl} />;
}
