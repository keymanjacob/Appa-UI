import type { Preview } from '@storybook/react';
import './globals.css';

/**
 * The component library is built on react-auth-app's dark theme (bg #0a0a0a,
 * gold brand, white text). We default the Storybook canvas to that dark surface
 * so dark-themed components (Spinner, Carousel, AppNavbar, Badge, …) render in
 * their intended context. A "light" background is also available for components
 * that live on light surfaces (e.g. ProductCard).
 */
const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'surface', value: '#1a1a1a' },
        { name: 'light', value: '#f5f5f5' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms', 'Layout', 'Pages'],
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          fontFamily: 'var(--font-primary)',
          color: 'var(--color-text-primary)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
