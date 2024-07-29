import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from './button';

const meta = {
  args: {
    children: 'Button',
  },
  component: Button,
  tags: ['autogen'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default = {} satisfies Story;
