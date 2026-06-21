/**
 * E-Commerce Catalog Page — Lego demo that composes every extracted component together.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button, Spinner, Badge, Avatar, Rating, ProductCard, SearchInput, Toast } from '../src';

const meta = {
  title: 'Pages/E-Commerce Catalog',
  parameters: { chromatic: { mode: 'visible' } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Toolbar bar ─────────────────────────────────────────────── */

const Toolbar = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
    <Avatar name="Jacob Fan" size="sm" />
    <SearchInput placeholder="Search products…" />
    <Badge variant="info" pill>3</Badge>
    <Button variant="ghost" size="sm">Sign In</Button>
  </div>
);

/* ── Product grid ────────────────────────────────────────────── */

const PRODUCTS = [
  { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', name: 'Wireless Headphones', subcategory: 'Audio / Over-ear', price: 199, originalPrice: 299 },
  { image: 'https://images.unsplash.com/photo-1572569511254-d8f6257bc8f7?w=600&h=600&fit=crop', name: 'Studio Monitor', subcategory: 'Audio / Speakers', price: 149 },
  { image: 'https://images.unsplash.com/photo-1546868871-9d7a7771273b?w=600&h=600&fit=crop', name: 'USB-C Hub 8-in-1', subcategory: 'Accessories / Hubs', price: 59, badge: { label: 'HOT', tone: 'dark' as const } },
  { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', name: 'Smart Watch', subcategory: 'Wearables / Watches', price: 299, originalPrice: 399 },
];

const Grid = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
    {PRODUCTS.map((p, i) => (
      <ProductCard key={i} {...p} />
    ))}
  </div>
);

/* ── Page composition ───────────────────────────────────────── */

export const ECommerceCatalog: Story = {
  render: () => (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '32px' }}>Shop</h1>
      <Toolbar />
      <Grid />
    </div>
  ),
};

/* ── Loading state (skeleton) ──────────────────────────────── */

export const LoadingState: Story = {
  render: () => (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <Toolbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '80px' }}>
        <Spinner size="large" variant="ring" />
        <span style={{ color: '#666' }}>Loading products…</span>
      </div>
    </div>
  ),
};

/* ── Toast notification on page ─────────────────────────────── */

export const WithToastNotification: Story = {
  render: () => (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <Toolbar />
      <Grid />
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        <Toast variant="success" title="Added to cart" message="Premium Wireless Headphones added." duration={5000} />
      </div>
    </div>
  ),
};
