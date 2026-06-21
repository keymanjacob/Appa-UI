/**
 * Button stories — every variant × size combination.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button', onClick: fn() },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
    },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default (primary / md) ─────────────────────────────────── */

export const Primary: Story = { args: { children: 'Primary Button' } };

/* ── Variant gallery ────────────────────────────────────────── */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

/* ── Size gallery ───────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/* ── Full width ─────────────────────────────────────────────── */

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full-width Primary Button' },
};

/* ── Disabled ───────────────────────────────────────────────── */

export const Disabled: Story = { args: { children: 'Disabled Button', disabled: true } };

/* ── All combos ─────────────────────────────────────────────── */

export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'ghost'] as const).map(variant => (
        <div key={variant}>
          <p style={{ color: '#a0a0a0', marginBottom: '8px', textTransform: 'capitalize' }}>{variant}</p>
          {(['sm', 'md', 'lg'] as const).map(size => (
            <Button key={size} variant={variant} size={size}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)} · {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
