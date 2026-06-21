/**
 * Spinner stories — every variant × size.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'dots', 'pulse', 'ring'] },
    size: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
    color: { control: { type: 'color' } },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Spinner variant="default" />
      <Spinner variant="dots" />
      <Spinner variant="pulse" />
      <Spinner variant="ring" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: { label: 'Loading...', size: 'large' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
    </div>
  ),
};

export const Overlay: Story = {
  parameters: { chromatic: { mode: 'visible' } },
  render: () => (
    <div style={{ position: 'relative', width: '400px', height: '300px', background: '#1a1a1a' }}>
      <Spinner overlay size="large" />
    </div>
  ),
};

export const CustomColor: Story = {
  args: { color: '#10b981', variant: 'ring' },
};
