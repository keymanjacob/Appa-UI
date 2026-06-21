/**
 * Toast stories — all variants + auto-dismiss vs manual.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast } from './Toast';

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { message: 'Your changes have been saved.' },
  argTypes: { variant: { control: { type: 'radio' }, options: ['success', 'error', 'warning', 'info'] } },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toast variant="success" title="Success" message="Your changes have been saved." />
      <Toast variant="error" title="Error" message="Something went wrong. Please try again." />
      <Toast variant="warning" title="Warning" message="Storage is nearly full." />
      <Toast variant="info" message="A new update is available." />
    </div>
  ),
};

export const AutoDismiss: Story = {
  args: { variant: 'success', title: 'Success', message: 'This will auto-dismiss in 2 seconds.', duration: 2000 },
};

export const ManualClose: StoryObj<{ onClose: () => void }> = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Toast variant="info" title="Notification" message="Manual dismiss required." onClose={() => setVisible(false)} />
    ) : (
      <div style={{ color: '#666', fontSize: '0.875rem' }}>Click "Show" to display.</div>
    );
  },
};

const ShowToast = () => {
  const [visible, setVisible] = useState(false);
  return visible ? (
    <Toast variant="info" message="Toast rendered standalone." onClose={() => setVisible(false)} />
  ) : (
    <button onClick={() => setVisible(true)} style={{ padding: '8px 16px' }}>Show Toast</button>
  );
};
