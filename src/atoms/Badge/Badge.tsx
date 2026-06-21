/**
 * Badge — Small status / count label extracted from react-auth-app patterns
 *
 * Variants: default, success, error, warning, info
 */

import React from 'react';
import './Badge.css';

export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  /** Show as a small circle (count badge) */
  pill?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  pill = false,
  className = '',
}) => (
  <span className={`cf-badge cf-badge--${variant}${pill ? ' cf-badge--pill' : ''} ${className}`.trim()}>
    {children}
  </span>
);

export default Badge;
