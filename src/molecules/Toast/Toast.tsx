/**
 * Toast — Single notification extracted from react-auth-app NotificationContainer
 *
 * Variants: success, error, warning, info.
 */

import React from 'react';
import './Toast.css';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  variant?: ToastVariant;
  /** Title / heading of the toast */
  title?: string;
  /** Body text */
  message: string;
  /** Auto-dismiss after ms (0 = manual close required) */
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const ICON_MAP: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

const COLOR_MAP: Record<ToastVariant, string> = {
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  message,
  duration = 4000,
  onClose,
  className = '',
}) => {
  const color = COLOR_MAP[variant];

  React.useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={`cf-toast cf-toast--${variant} ${className}`.trim()}
      role="alert"
      style={{ '--cf-toast-accent': color } as React.CSSProperties}
    >
      <span className="cf-toast__icon" style={{ color }}>{ICON_MAP[variant]}</span>
      <div className="cf-toast__content">
        {title && <strong className="cf-toast__title">{title}</strong>}
        <p className="cf-toast__message">{message}</p>
      </div>
      {onClose && (
        <button type="button" className="cf-toast__close" onClick={onClose} aria-label="Dismiss">
          ✕
        </button>
      )}
    </div>
  );
};

export default Toast;
