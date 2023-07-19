import { InputGroup } from "../input/group/input.group";

type Props = {
  label?: string;
};

export function List(props: Props) {
  return <InputGroup label={props.label} direction="column">
    <button>HERE</button>
  </InputGroup>
}
