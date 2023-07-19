import type { Meta, StoryObj } from '@storybook/react';
import { BaseCard } from '../../storybook/card';
import { InputNumber } from './input.number';

const meta = {
  title: 'Lunex UI/Input/Input Number',
  component: (props) => <BaseCard><InputNumber {...props} /></BaseCard>,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: { 
      options: ['small', 'medium', 'large'],
      control: 'select' 
    },
  },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Small: Story = {
  args: {
    label: 'Input Small',
    size: 'small'
  },
};

export const Medium: Story = {
  args: {
    label: 'Input Medium',
    size: 'medium'  
  },
};

export const Large: Story = {
  args: {
    label: 'Input Large',
    size: 'large'
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Input Large',
    size: 'large',
    rightIcon: <span className="opacity-50 uppercase font-bold" style={{ fontSize: 11 }}>%</span>
  },
};