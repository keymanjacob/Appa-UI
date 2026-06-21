/**
 * AppNavbar stories — extracted from the production EnhancedNavbar.
 *
 * Click a nav item with children (Products / Resources) to open the full-width
 * mega dropdown. The `OpenDropdown` story opens it automatically. The navbar is
 * `position: fixed`, so each story uses a tall dark stage.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, expect } from '@storybook/test';
import { AppNavbar } from './AppNavbar';

const ITEMS = [
  {
    id: 'products',
    label: 'Products',
    children: [
      { label: 'Marketplace', href: '#', description: 'Browse the full product catalog.' },
      { label: 'Collections', href: '#', description: 'Curated bundles and sets.' },
      { label: 'New Arrivals', href: '#', description: 'The latest drops this week.' },
      { label: 'Deals', href: '#', description: 'Discounts and limited offers.' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    children: [
      { label: 'Documentation', href: '#', description: 'Guides, APIs and references.' },
      { label: 'Blog', href: '#', description: 'Product news and engineering posts.' },
      { label: 'Support', href: '#', description: 'Help center and contact options.' },
    ],
  },
  { id: 'pricing', label: 'Pricing', href: '#' },
  { id: 'about', label: 'About', href: '#' },
];

const meta = {
  title: 'Organisms/AppNavbar',
  component: AppNavbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Production navigation bar (from react-auth-app EnhancedNavbar): click-to-open ' +
          'full-width mega dropdowns, a slide-down mobile drawer with overlay + close, ' +
          'click-outside handling, and dark/light themes.',
      },
    },
  },
  args: {
    brand: 'AURUM',
    items: ITEMS,
    cta: { label: 'Schedule Now', href: '#' },
    forceScrolled: true,
    onNavigate: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', paddingTop: 70, background: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LightTheme: Story = {
  args: { theme: 'light' },
  parameters: { backgrounds: { default: 'light' } },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', paddingTop: 70, background: '#e9e9ec' }}>
        <Story />
      </div>
    ),
  ],
};

/** Auto-opens the "Products" mega dropdown so you can see it without interacting. */
export const OpenDropdown: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Open the Products mega dropdown', async () => {
      const trigger = canvas.getByRole('button', { name: /Products/i });
      await userEvent.click(trigger);
      await expect(canvas.getByText('Marketplace')).toBeVisible();
    });
  },
};

export const SimpleLinksOnly: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'features', label: 'Features', href: '#' },
      { id: 'pricing', label: 'Pricing', href: '#' },
      { id: 'contact', label: 'Contact', href: '#' },
    ],
    cta: undefined,
  },
};
