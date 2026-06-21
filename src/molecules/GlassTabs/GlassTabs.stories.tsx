/**
 * GlassTabs stories — Liquid Glass segmented control with a springy sliding thumb.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { GlassTabs } from './GlassTabs';

const STAGE: React.CSSProperties = {
  minHeight: 220,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 40,
  background:
    'radial-gradient(120% 120% at 100% 0%, #f6d365 0%, #fda085 35%, #a18cd1 75%, #6a5af9 100%)',
};

const meta = {
  title: 'Molecules/GlassTabs',
  component: GlassTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Apple "Liquid Glass" segmented control. A glass thumb springs to the active ' +
          'segment. Controlled or uncontrolled; variants regular / clear.',
      },
    },
  },
  args: {
    options: [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Year', value: 'year' },
    ],
    defaultValue: 'week',
    size: 'md',
    variant: 'regular',
    onChange: fn(),
  },
  argTypes: {
    variant: { control: { type: 'inline-radio' }, options: ['regular', 'clear'] },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <div style={STAGE}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GlassTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoOptions: Story = {
  args: {
    options: [
      { label: 'List', value: 'list' },
      { label: 'Grid', value: 'grid' },
    ],
    defaultValue: 'list',
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      {
        label: 'Photos',
        value: 'photos',
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        ),
      },
      {
        label: 'Albums',
        value: 'albums',
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        ),
      },
    ],
    defaultValue: 'photos',
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ ...STAGE, alignItems: 'stretch' }}>
        <div style={{ width: '100%', maxWidth: 520, margin: 'auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

/** Controlled example — value lives in the parent. */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('week');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <GlassTabs {...args} value={value} onChange={setValue} />
        <span style={{ color: '#fff', fontWeight: 600 }}>Selected: {value}</span>
      </div>
    );
  },
};
