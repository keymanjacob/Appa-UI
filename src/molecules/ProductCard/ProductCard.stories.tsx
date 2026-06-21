/**
 * ProductCard stories — discount, wishlist, badges, and a marketplace grid.
 * Origin pattern: react-auth-app marketplace grid.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ProductCard } from './ProductCard';

const SAMPLE_IMG =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop';

const meta = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Marketplace product card with discount badge, wishlist heart toggle, ' +
          'strikethrough sale pricing and an Add-to-Cart CTA. Extracted from react-auth-app.',
      },
    },
  },
  args: {
    image: SAMPLE_IMG,
    name: 'Premium Wireless Headphones',
    subcategory: 'Audio / Over-ear',
    price: 199,
    onAddToCart: fn(),
    onToggleWishlist: fn(),
  },
  argTypes: {
    price: { control: { type: 'number' } },
    originalPrice: { control: { type: 'number' } },
    badge: { control: 'object' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnSale: Story = {
  args: {
    price: 149,
    originalPrice: 249,
  },
};

export const Wishlisted: Story = {
  args: {
    defaultWishlisted: true,
  },
};

export const CustomBadge: Story = {
  args: {
    badge: { label: 'NEW', tone: 'gray' },
  },
};

export const NoImage: Story = {
  args: {
    image: undefined,
    name: 'Unreleased Product',
  },
};

export const LongName: Story = {
  args: {
    name: 'Ultra Premium Studio Reference Monitor Headphones with Active Noise Cancellation',
  },
};

export const MarketplaceGrid: Story = {
  parameters: { layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 20,
        maxWidth: 960,
      }}
    >
      <ProductCard {...args} name="Wireless Headphones" price={199} originalPrice={249} subcategory="Audio / Over-ear" />
      <ProductCard {...args} name="Studio Monitor" price={149} subcategory="Audio / Speakers" badge={{ label: 'HOT', tone: 'dark' }} />
      <ProductCard {...args} name="USB-C Hub 8-in-1" price={59} subcategory="Accessories / Hubs" />
      <ProductCard {...args} name="Mechanical Keyboard" price={89} originalPrice={129} subcategory="Accessories / Input" />
    </div>
  ),
};
