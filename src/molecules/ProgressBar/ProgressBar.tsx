/**
 * ProgressBar — progress indicator for loading states and async operations
 *
 * Origin: react-auth-app/src/components/ProgressBar/index.tsx (no app deps — verbatim)
 * Determinate + indeterminate modes; linear / gradient / striped variants.
 */

import React from 'react';
import './ProgressBar.css';

export type ProgressBarVariant = 'linear' | 'gradient' | 'striped';
export type ProgressBarSize = 'small' | 'medium' | 'large';

export interface ProgressBarProps {
  /** Progress value (0-100). If undefined, shows indeterminate animation */
  value?: number;
  /** Visual variant */
  variant?: ProgressBarVariant;
  /** Size of the bar */
  size?: ProgressBarSize;
  /** Primary color */
  color?: string;
  /** Secondary color (for gradient) */
  secondaryColor?: string;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label text */
  label?: string;
  /** Additional CSS class */
  className?: string;
  /** Animate value changes */
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'linear',
  size = 'medium',
  color,
  secondaryColor,
  showLabel = false,
  label,
  className = '',
  animated = true,
}) => {
  const isIndeterminate = value === undefined;
  const clampedValue = value !== undefined ? Math.min(Math.max(value, 0), 100) : 0;

  const progressStyle: React.CSSProperties = {
    ...(color && { '--progress-color': color }),
    ...(secondaryColor && { '--progress-secondary-color': secondaryColor }),
    '--progress-value': `${clampedValue}%`,
  } as React.CSSProperties;

  const displayLabel = label || (showLabel && !isIndeterminate ? `${Math.round(clampedValue)}%` : null);

  return (
    <div
      className={`progress-bar progress-bar--${size} progress-bar--${variant} ${
        isIndeterminate ? 'progress-bar--indeterminate' : ''
      } ${animated ? 'progress-bar--animated' : ''} ${className}`.trim()}
      style={progressStyle}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={!isIndeterminate ? { width: `${clampedValue}%` } : undefined} />
      </div>
      {displayLabel && <span className="progress-bar__label">{displayLabel}</span>}
    </div>
  );
};

export default ProgressBar;
