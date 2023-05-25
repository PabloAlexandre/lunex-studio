import {
  Landing01Template, landing01State,
} from '../../templates';

import { EditableProvider } from '../editable-provider';

const map = {
  'landing-01': {
    component: Landing01Template,
    state: landing01State,
  },
  default: {
    component: Landing01Template,
    state: landing01State,
  }
};

interface TemplateSelectorProps {
  template: keyof typeof map;
  id: string;
  state?: any;
  isEditable?: boolean,
}

export function TemplateSelector({
  template,
  id,
  state,
  isEditable = false,
}: TemplateSelectorProps) {
  const {
    component: Template,
    state: templateState,
  } = map[template] || map.default;

  if(id) {
    EditableProvider.getInstance().setId(id);
  }

  if(isEditable) {
    EditableProvider.getInstance().setEditable(isEditable);
  }

  EditableProvider.getInstance().setInitialState(state || templateState);

  return (
    <Template id={id as string}/>
  )
}