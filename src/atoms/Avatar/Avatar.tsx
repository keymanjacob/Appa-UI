/**
 * Avatar — Circular user image / initials badge extracted from react-auth-app ProfileAvatar
 *
 * Falls back to capitalized initials when no src is provided.
 */

import React from 'react';
import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Display name for generating initials fallback */
  name?: string;
  /** Profile image URL. If omitted, initials are shown. */
  src?: string;
  size?: AvatarSize;
  shape?: 'circle' | 'square';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  shape = 'circle',
  className = '',
}) => {
  /* Generate initials from display name */
  const initials = name
    ? name!.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]!.toUpperCase()).join('')
    : '';

  if (src) {
    return (
      <img
        alt={name || 'Avatar'}
        src={src}
        className={`cf-avatar cf-avatar--${size} cf-avatar--${shape} cf-avatar--image ${className}`.trim()}
      />
    );
  }

  return (
    <div
      className={`cf-avatar cf-avatar--${size} cf-avatar--${shape} cf-avatar--initials ${className}`.trim()}
      role="img"
      aria-label={name || 'Avatar'}
    >
      {initials}
    </div>
  );
};

export default Avatar;
