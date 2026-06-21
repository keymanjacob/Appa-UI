/**
 * Badge stories — all variants + pill/count mode.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Badge' },
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'success', 'error', 'warning', 'info'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Default' } };

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {(['default', 'success', 'error', 'warning', 'info'] as const).map(v => (
        <Badge key={v} variant={v}>{v}</Badge>
      ))}
    </div>
  ),
};

export const Pill: Story = { args: { children: '42', pill: true } };

export const Pills: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {(['default', 'success', 'error', 'warning', 'info'] as const).map(v => (
        <Badge key={v} variant={v} pill>{Math.floor(Math.random() * 100)}</Badge>
      ))}
    </div>
  ),
};
