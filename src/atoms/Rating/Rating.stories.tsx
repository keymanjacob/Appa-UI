/**
 * Rating stories — various values, max scales, and sizes.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

const meta = {
  title: 'Atoms/Rating',
  component: Rating,
  tags: ['autodocs'],
  args: { value: 4 },
  argTypes: { size: { control: { type: 'range' }, min: 12, max: 48, step: 2 } },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullFive: Story = { args: { value: 5 } };

export const ThreeAndHalf: Story = { args: { value: 3.5 } };

export const Zero: Story = { args: { value: 0 } };

export const CustomScale: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Rating value={7.5} max={10} size={20} />
      <span style={{ color: '#666', fontSize: '0.875rem' }}>7.5 / 10</span>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Rating value={4} size={16} />
      <Rating value={4} size={24} />
      <Rating value={4} size={32} />
    </div>
  ),
};
