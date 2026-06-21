/**
 * GlassButton — Apple "Liquid Glass" button (iOS 26 / visionOS style)
 *
 * A translucent capsule that refracts and brightens whatever sits behind it:
 * backdrop blur + saturation, a specular top sheen, an inner edge-highlight ring,
 * a soft lift shadow, and springy press physics. Designed to sit over colorful
 * or photographic backgrounds, where glass materials read best.
 *
 * Materials:
 *  - `regular`  — the standard frosted glass chip.
 *  - `clear`    — thinner, more transparent; for busy / media backgrounds.
 *  - `tinted`   — colored glass driven by the `tint` prop.
 */

import React from 'react';
import './GlassButton.css';

export type GlassButtonVariant = 'regular' | 'clear' | 'tinted';
export type GlassButtonSize = 'sm' | 'md' | 'lg';

export interface GlassButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  /** Tint color for the `tinted` variant (any CSS color). */
  tint?: string;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  className?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'regular',
  size = 'md',
  tint,
  fullWidth = false,
  icon,
  className = '',
  style,
  type = 'button',
  ...rest
}) => {
  const tintStyle =
    variant === 'tinted' && tint ? ({ '--cf-glass-tint': tint } as React.CSSProperties) : undefined;

  return (
    <button
      type={type}
      className={[
        'cf-glass-btn',
        `cf-glass-btn--${variant}`,
        `cf-glass-btn--${size}`,
        fullWidth ? 'cf-glass-btn--full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...tintStyle, ...style }}
      {...rest}
    >
      <span className="cf-glass-btn__sheen" aria-hidden="true" />
      <span className="cf-glass-btn__label">
        {icon && <span className="cf-glass-btn__icon">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default GlassButton;
