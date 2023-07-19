import type { Meta, StoryObj } from '@storybook/react';
import { BaseCard } from '../../storybook/card';
import { InputText } from './input.text';

const meta = {
  title: 'Lunex UI/Input/Input Text',
  component: (props) => <BaseCard><InputText {...props} /></BaseCard>,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: { 
      options: ['small', 'medium', 'large'],
      control: 'select' 
    },
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Small: Story = {
  args: {
    label: 'Input Small',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    label: 'Input Medium',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    label: 'Input Large',
    size: 'large',
  },
};

export const WithoutLabel: Story = {
  args: {
    size: 'medium',
    placeholder: 'Input without label',
  },
};


export const WithLeftIcon: Story = {
  args: {
    size: 'medium',
    placeholder: 'Input without label',
    leftIcon: <span className="opacity-50 uppercase font-bold" style={{ fontSize: 9 }}>L</span>
  },
};

export const WithRightIcon: Story = {
  args: {
    size: 'medium',
    placeholder: 'Input without label',
    rightIcon: <span className="opacity-50 uppercase font-bold" style={{ fontSize: 9 }}>R</span>
  },
};

export const WithIcons: Story = {
  args: {
    size: 'medium',
    placeholder: 'Input without label',
    leftIcon: <span className="opacity-50 uppercase font-bold" style={{ fontSize: 9 }}>&</span>,
    rightIcon: <span className="opacity-50 uppercase font-bold" style={{ fontSize: 9 }}>%</span>
  },
};