/**
 * Avatar stories — image source, initials fallback, all sizes.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg', 'xl'] },
    shape: { control: { type: 'radio' }, options: ['circle', 'square'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = { args: { src: 'https://i.pravatar.cc/128?img=12', name: 'Jacob Fan' } };

export const Initials: Story = { args: { name: 'Jacob Fan' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
      <Avatar size="sm" name="S M" />
      <Avatar size="md" name="Ac Me" />
      <Avatar size="lg" name="Lo rem" />
      <Avatar size="xl" name="Ip sum" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar shape="circle" name="Cir cle" size="lg" />
      <Avatar shape="square" name="Squ are" size="lg" />
    </div>
  ),
};
