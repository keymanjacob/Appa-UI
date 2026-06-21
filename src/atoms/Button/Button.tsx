/**
 * Button — Reusable button extracted from react-auth-app / course-shop-ui
 *
 * Extracted from: react-auth-app (CouponButton pattern), course-shop-ui (common/Button)
 * Variants: primary / secondary / ghost
 * Sizes: sm / md / lg
 */

import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => (
  <button
    type={type}
    className={`cf-button cf-button--${variant} cf-button--${size}${fullWidth ? ' cf-button--full' : ''} ${className}`.trim()}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
