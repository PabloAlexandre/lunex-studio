import type { Meta, StoryObj } from '@storybook/react';
import { BaseCard } from '../storybook/card';
import { List } from './list';

const meta = {
  title: 'Lunex UI/List/List Container/Empty List',
  component: (props) => <BaseCard><List {...props} /></BaseCard>,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EmptyList: Story = {
  args: {
    label: 'Your new empty list',
  },
};
