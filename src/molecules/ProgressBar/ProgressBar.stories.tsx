/**
 * ProgressBar stories — all variants × sizes, determinate + indeterminate.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['linear', 'gradient', 'striped'] },
    size: { control: { type: 'radio' }, options: ['small', 'medium', 'large'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: { type: 'color' } },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = { args: { value: 65, showLabel: true, variant: 'linear' } };

export const Gradient: Story = { args: { value: 40, showLabel: true, variant: 'gradient', animated: true } };

export const Striped: Story = { args: { value: 80, showLabel: true, variant: 'striped', animated: true } };

export const Indeterminate: Story = { args: { value: undefined, variant: 'linear', color: '#d4af37' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '360px' }}>
      <ProgressBar value={50} size="small" showLabel />
      <ProgressBar value={50} size="medium" showLabel />
      <ProgressBar value={50} size="large" showLabel />
    </div>
  ),
};
