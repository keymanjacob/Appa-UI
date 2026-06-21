/**
 * SearchInput — Global search field extracted from react-auth-app NavbarSearch / OmniSearch
 *
 * Renders a single-line input with icon, placeholder state, and clear button.
 */

import React, { useState } from 'react';
import './SearchInput.css';

export interface SearchInputProps {
  /** Initial value */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value for controlled usage */
  value?: string;
  /** Called on every input change */
  onChange?: (value: string) => void;
  /** Called when user submits (Enter key) */
  onSubmit?: (value: string) => void;
  /** Show a clear button when there's text */
  showClear?: boolean;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  defaultValue,
  placeholder = 'Search…',
  value: controlledValue,
  onChange,
  onSubmit,
  showClear = true,
  className = '',
}) => {
  const [internal, setInternal] = useState(defaultValue ?? '');
  const controlled = controlledValue ?? internal;
  const hasText = controlled.length > 0;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!controlledValue) setInternal(e.target.value);
    onChange?.(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') onSubmit?.(controlled);
  };

  const handleClear = () => {
    setInternal('');
    onChange?.('');
    onSubmit?.('');
  };

  return (
    <div className={`cf-search-input ${className}`.trim()}>
      <svg className="cf-search-input__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>

      <input
        type="text"
        value={controlled}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="cf-search-input__field"
      />

      {showClear && hasText && (
        <button
          type="button"
          className="cf-search-input__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
