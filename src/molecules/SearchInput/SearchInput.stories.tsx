/**
 * SearchInput stories — default, focused, and with value.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = { args: { defaultValue: 'headphones' } };

export const PlaceholderVariant: Story = {
  args: { placeholder: 'Search products, brands, categories…' },
};
