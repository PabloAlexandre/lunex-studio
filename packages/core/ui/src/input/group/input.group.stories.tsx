import type { Meta, StoryObj } from '@storybook/react';
import { BaseCard } from '../../storybook/card';
import { InputGroup } from './input.group';
import { InputNumber } from '../number/input.number';


const InputGroupStory = ({_storyConfig, label, ...props}: any) => {
  const subComponent = _storyConfig?.nested ? (
    <InputGroup {...props}>
      <InputNumber size="small" label="X" labelPadding={false}/>
      <InputNumber size="small" label="Y" labelPadding={false}/>
      <InputNumber size="small" label="Z" labelPadding={false}/>
    </InputGroup> 
  ) : <div className="w-full h-4 bg-red-300" />;
  console.log({ props });
  return (
    <BaseCard>
     <InputGroup label={label} {...props}>
       { subComponent }
     </InputGroup>
    </BaseCard>
  )
};

const meta = {
  title: 'Lunex UI/Input/Input Group',
  component: InputGroupStory,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    direction: { control: 'text' },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const HorizontalGroup: Story = {
  args: {
    label: 'HG'
  },
};

export const VerticalGroup: Story = {
  args: {
    direction: 'column',
    label: 'Vertical Group',
  },
};

export const WithoutLabel: Story = {
  args: {
    // size: 'large',
    // label: 'Input Number',
  },
};

export const Nested: Story = {
  args: {
    _storyConfig: {
      nested: true,
    },
    // size: 'large',
    label: 'Position',
  },
};

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Input Number',
//   },
// };
