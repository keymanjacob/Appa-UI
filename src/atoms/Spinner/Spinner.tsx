/**
 * Spinner — elegant loading spinner for async operations
 *
 * Origin: react-auth-app/src/components/LoadingSpinner/index.tsx
 * Dependency stripping: i18n (`labelKey`/`useTranslation`) removed — pass `label`.
 * Variants: default (ring), dots, pulse, ring (SVG). Optional full-screen overlay.
 */

import React from 'react';
import './Spinner.css';

export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerVariant = 'default' | 'dots' | 'pulse' | 'ring';

export interface SpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Visual variant */
  variant?: SpinnerVariant;
  /** Custom color (any CSS color) */
  color?: string;
  /** Label text shown beneath the animation */
  label?: string;
  /** Show as a full-screen blurred overlay */
  overlay?: boolean;
  /** Additional CSS class */
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  variant = 'default',
  color,
  label,
  overlay = false,
  className = '',
}) => {
  const spinnerStyle = color ? ({ '--spinner-color': color } as React.CSSProperties) : undefined;

  const spinnerContent = (
    <div
      className={`loading-spinner loading-spinner--${size} loading-spinner--${variant} ${className}`.trim()}
      style={spinnerStyle}
    >
      <div className="loading-spinner__animation-wrapper">
        {variant === 'default' && (
          <div className="loading-spinner__ring">
            <div className="loading-spinner__ring-inner" />
          </div>
        )}

        {variant === 'dots' && (
          <div className="loading-spinner__dots">
            <span className="loading-spinner__dot" />
            <span className="loading-spinner__dot" />
            <span className="loading-spinner__dot" />
          </div>
        )}

        {variant === 'pulse' && (
          <div className="loading-spinner__pulse">
            <div className="loading-spinner__pulse-ring" />
            <div className="loading-spinner__pulse-ring" />
          </div>
        )}

        {variant === 'ring' && (
          <div className="loading-spinner__modern-ring">
            <svg viewBox="0 0 50 50">
              <circle className="loading-spinner__track" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
              <circle className="loading-spinner__progress" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
            </svg>
          </div>
        )}
      </div>

      {label && <span className="loading-spinner__label">{label}</span>}
    </div>
  );

  if (overlay) {
    return <div className="loading-spinner__overlay">{spinnerContent}</div>;
  }

  return spinnerContent;
};

export default Spinner;
