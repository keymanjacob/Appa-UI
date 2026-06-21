/**
 * Rating — Star rating display extracted from course-shop-ui / react-auth-app patterns
 *
 * Displays 1–5 stars, supports half-star via decimal values.
 */

import React from 'react';
import './Rating.css';

export interface RatingProps {
  /** Rating value (0–5, supports decimals like 3.5) */
  value: number;
  /** Max rating scale (default 5) */
  max?: number;
  /** Size in pixels (default 24) */
  size?: number;
  /** Color for filled stars (default brand color) */
  activeColor?: string;
  /** Color for empty stars (default muted) */
  inactiveColor?: string;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 24,
  activeColor = '#d4af37',
  inactiveColor = '#333333',
  className = '',
}) => {
  const clampedValue = Math.min(Math.max(value, 0), max);

  return (
    <span className={`cf-rating ${className}`.trim()}>
      {[...Array(max)].map((_, i) => {
        const fillRatio = clampedValue - i; // how much of this star is filled
        const full = Math.floor(fillRatio);
        const partial = fillRatio - full;

        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`cf-rating__star cf-rating__star--${full > 0 ? 'filled' : 'empty'}`}
            style={partial > 0 ? { '--cf-rating-partial': partial } as React.CSSProperties : undefined}
          >
            <defs>
              <linearGradient id={`cf-half-${i}`}>
                <stop offset={`${partial * 100}%`} stopColor={activeColor} />
                <stop offset={`${partial * 100}%`} stopColor={inactiveColor} />
              </linearGradient>
            </defs>
            <path
              fill={full > 0 ? activeColor : partial > 0 ? `url(#cf-half-${i})` : inactiveColor}
              stroke={inactiveColor}
              strokeWidth="1"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      })}
    </span>
  );
};

export default Rating;
