/**
 * GlassButton stories — Apple Liquid Glass material on vivid backgrounds.
 * Glass reads best over color/photography, so stories use a gradient stage.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GlassButton } from './GlassButton';

const STAGE: React.CSSProperties = {
  minHeight: 220,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  flexWrap: 'wrap',
  padding: 40,
  background:
    'radial-gradient(120% 120% at 0% 0%, #ff6ec4 0%, #7873f5 45%, #21d4fd 100%)',
};

const meta = {
  title: 'Atoms/GlassButton',
  component: GlassButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Apple "Liquid Glass" (iOS 26 / visionOS) button: translucent capsule with ' +
          'backdrop blur + saturation, specular sheen, inner edge highlight and springy ' +
          'press. Variants: regular / clear / tinted.',
      },
    },
  },
  args: {
    children: 'Continue',
    variant: 'regular',
    size: 'md',
    onClick: fn(),
  },
  argTypes: {
    variant: { control: { type: 'inline-radio' }, options: ['regular', 'clear', 'tinted'] },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    tint: { control: { type: 'color' } },
  },
  decorators: [
    (Story) => (
      <div style={STAGE}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GlassButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {};

export const Clear: Story = { args: { variant: 'clear', children: 'Clear Glass' } };

export const Tinted: Story = { args: { variant: 'tinted', tint: '#3b82f6', children: 'Tinted Glass' } };

export const WithIcon: Story = {
  args: {
    children: 'Add to Library',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <GlassButton {...args} size="sm">Small</GlassButton>
      <GlassButton {...args} size="md">Medium</GlassButton>
      <GlassButton {...args} size="lg">Large</GlassButton>
    </>
  ),
};

export const Gallery: Story = {
  render: (args) => (
    <>
      <GlassButton {...args} variant="regular">Regular</GlassButton>
      <GlassButton {...args} variant="clear">Clear</GlassButton>
      <GlassButton {...args} variant="tinted" tint="#34c759">Confirm</GlassButton>
      <GlassButton {...args} variant="tinted" tint="#ff3b30">Delete</GlassButton>
      <GlassButton {...args} disabled>Disabled</GlassButton>
    </>
  ),
};
