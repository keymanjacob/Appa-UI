/**
 * GlassTabs — Apple "Liquid Glass" segmented control / tab switcher
 *
 * A translucent capsule track with a brighter glass "thumb" that springs to the
 * active segment. Works controlled (`value` + `onChange`) or uncontrolled
 * (`defaultValue`). Equal-width segments keep the sliding thumb math simple.
 */

import React, { useId, useState } from 'react';
import './GlassTabs.css';

export type GlassTabsVariant = 'regular' | 'clear';
export type GlassTabsSize = 'sm' | 'md' | 'lg';

export interface GlassTabOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface GlassTabsProps {
  options: GlassTabOption[];
  /** Controlled active value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: GlassTabsVariant;
  size?: GlassTabsSize;
  /** Stretch to fill the container width */
  fullWidth?: boolean;
  className?: string;
}

export const GlassTabs: React.FC<GlassTabsProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  variant = 'regular',
  size = 'md',
  fullWidth = false,
  className = '',
}) => {
  const groupName = useId();
  const [internal, setInternal] = useState<string>(
    defaultValue ?? value ?? options[0]?.value ?? '',
  );
  const current = value ?? internal;

  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === current),
  );

  const select = (val: string) => {
    if (value === undefined) setInternal(val);
    onChange?.(val);
  };

  return (
    <div
      className={[
        'cf-glass-tabs',
        `cf-glass-tabs--${variant}`,
        `cf-glass-tabs--${size}`,
        fullWidth ? 'cf-glass-tabs--full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="tablist"
      aria-orientation="horizontal"
      style={
        {
          '--cf-tabs-count': options.length,
          '--cf-tabs-index': activeIndex,
        } as React.CSSProperties
      }
    >
      <span className="cf-glass-tabs__thumb" aria-hidden="true" />
      {options.map((option) => {
        const active = option.value === current;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            id={`${groupName}-${option.value}`}
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            className={`cf-glass-tabs__option ${active ? 'cf-glass-tabs__option--active' : ''}`}
            onClick={() => select(option.value)}
          >
            {option.icon && <span className="cf-glass-tabs__icon">{option.icon}</span>}
            <span className="cf-glass-tabs__text">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default GlassTabs;
