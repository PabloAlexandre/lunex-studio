import type { Meta, StoryObj } from '@storybook/react';
import { BaseCard } from '../../storybook/card';
import { InputSelect } from './input.select';

const meta = {
  title: 'Lunex UI/Input/Input Select',
  component: (props) => <BaseCard><InputSelect {...props} /></BaseCard>,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: { 
      options: ['small', 'medium', 'large'],
      control: 'select' 
    },
  },
} satisfies Meta<typeof InputSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Small: Story = {
  args: {
    label: 'Input Small',
    size: 'small',
    options: ['A', 'B', 'C']
  },
};

export const Medium: Story = {
  args: {
    label: 'Layout Type',
    size: 'medium',
    options: ['Row', 'Column', 'Grid'] 
  },
};

export const Large: Story = {
  args: {
    label: 'Input Large',
    size: 'large',
    options: ['A', 'B', 'C']
  },
};