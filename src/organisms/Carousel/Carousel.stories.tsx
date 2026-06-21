/**
 * Carousel stories — center layout, split layout, text-only, full controls.
 * The carousel fills its container (height: 100%), so each story is wrapped in
 * a fixed-height stage.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta = {
  title: 'Organisms/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-bleed hero carousel with auto-slide, progress timer, touch swipe, ' +
          'Apple-style progress controller, and center/split layouts. Extracted from react-auth-app.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '70vh', minHeight: 480, background: 'var(--color-bg-primary)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Center layout ─────────────────────────────────────────── */

const CENTER_SLIDES = [
  {
    id: '1',
    subtitle: 'Introducing',
    title: 'The Future of Design',
    description: 'A carousel that moves with the flow — smooth, infinite, and endlessly configurable.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-8e2632b7c094?w=1600&h=900&fit=crop',
  },
  {
    id: '2',
    subtitle: 'Features',
    title: 'Built for Scale',
    description: 'Touch swipe, auto-slide, progress tracking, and Apple-style navigation — all from production.',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c38970e8faa?w=1600&h=900&fit=crop',
  },
  {
    id: '3',
    subtitle: 'Ready to launch',
    title: 'Ship it today',
    description: 'Zero external dependencies beyond React. Plain CSS, tokenized theming.',
    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b1a151ace24?w=1600&h=900&fit=crop',
  },
];

export const CenterLayout: Story = {
  args: { slides: CENTER_SLIDES, showArrows: true, autoSlideInterval: 5000 },
};

/* ── Split layout with diagram + features ──────────────────── */

const SPLIT_SLIDES = [
  {
    id: '1',
    subtitle: 'Architecture',
    title: 'Layered by Design',
    description: 'Atoms compose into molecules, molecules into organisms.',
    features: ['Strict tier hierarchy', 'Zero cross-tier imports', 'Composition over inheritance'],
    layout: 'split' as const,
    diagramUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    ctaText: 'Explore',
    ctaLink: '#',
    textStyles: { titleColor: '#ffffff', descriptionColor: '#a0a0a0' },
  },
];

export const SplitLayout: Story = {
  args: { slides: SPLIT_SLIDES, autoSlideInterval: 0 },
};

/* ── Text only (no image) ──────────────────────────────────── */

const TEXT_ONLY_SLIDES = [
  { id: '1', subtitle: 'Quote I', title: 'The best way to predict the future is to invent it.', description: '— Alan Kay' },
  { id: '2', subtitle: 'Quote II', title: 'Design is how it works.', description: '— Steve Jobs' },
];

export const TextOnly: Story = {
  args: { slides: TEXT_ONLY_SLIDES, autoSlideInterval: 4000 },
};

/* ── Full controls ─────────────────────────────────────────── */

export const FullControls: Story = {
  args: {
    slides: CENTER_SLIDES,
    showArrows: true,
    showProgressController: true,
    showPauseButton: true,
    loop: true,
    pauseOnHover: true,
  },
};
