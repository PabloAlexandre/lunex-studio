const NewCommandInfo = [{
  name: 'name',
  message: 'What is the command name?',
  required: true,
}, {
  name: 'description',
  message: 'What is the command description?',
  required: true,
}];

const NewCommand = [{
  name: 'category',
  message: 'What is the command category?',
  required: true,
}, {
  name: 'info',
  type: 'repetable',
  message: 'Do you wanna to create command info?',
  ask: 'Do you wanna to create another command info?',
  fields: NewCommandInfo,
}]

const NewPanel = [{
  name: 'id',
  message: 'What is the panel id?',
  required: true,
}, {
  name: 'title',
  message: 'What is the panel title?',
}, {
  name: 'side',
  type: 'list',
  message: 'What is the panel side?',
  choices: ['left', 'right'],
  default: 'left'
}]

const NewWindow = [{
  name: 'id',
  message: 'What is the window id?',
  required: true,
}, {
  name: 'title',
  message: 'What is the window title?',
  required: true,
}, {
  name: 'canClose',
  message: 'You can close window?',
  type: 'boolean',
  defaultValue: true
}, {
  name: 'isEditable',
  message: 'You can edit window name?',
  type: 'boolean',
  defaultValue: true
}]


export const NewExtensionSchema = [{
  name: 'commands',
  type: 'repetable',
  message: 'Do you wanna to create command extension?',
  ask: 'Do you wanna to create another command?',
  fields: NewCommand,
}, {
  name: 'panels',
  type: 'repetable',
  message: 'Do you wanna to create panel extension?',
  ask: 'Do you wanna to create another panel?',
  fields: NewPanel,
}, {
  name: 'windows',
  type: 'repetable',
  message: 'Do you wanna to create window extensions?',
  ask: 'Do you wanna to create another window?',
  fields: NewWindow,
}]