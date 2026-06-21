/**
 * ProductCard — Marketplace product card
 *
 * Origin: react-auth-app/src/components/products/ProductCard.tsx
 * A dark-on-light marketplace card with discount badge, wishlist heart toggle,
 * strikethrough sale pricing, and an "Add to Cart" CTA.
 *
 * Dependency stripping vs. source:
 *  - The app `Product` type is replaced by explicit, generic props.
 *  - Wishlist state is internal but reported via `onToggleWishlist`.
 *  - Add-to-cart is surfaced as the `onAddToCart` callback.
 */

import React, { useState } from 'react';
import './ProductCard.css';

export type ProductBadge = {
  label: string;
  /** Visual tone of the badge pill */
  tone?: 'red' | 'gray' | 'dark';
};

export interface ProductCardProps {
  /** Product image URL. Falls back to a checkerboard placeholder when omitted. */
  image?: string;
  /** Product display name (clamped to 2 lines). */
  name: string;
  /** Secondary line, e.g. "Software / Pro license". */
  subcategory?: string;
  /** Current price (numeric). Rendered as the prominent price. */
  price: number;
  /** Original price — when greater than `price`, a discount badge + strikethrough show. */
  originalPrice?: number;
  /** Currency symbol prefix. */
  currency?: string;
  /**
   * Explicit badge. When omitted, a discount badge is derived automatically
   * from `originalPrice`/`price`.
   */
  badge?: ProductBadge;
  /** Initial wishlist state. */
  defaultWishlisted?: boolean;
  /** Fired when the wishlist heart is toggled. */
  onToggleWishlist?: (wishlisted: boolean) => void;
  /** Fired when "Add to Cart" is clicked. */
  onAddToCart?: () => void;
  className?: string;
}

const HeartIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? '#E53E3E' : 'none'}
    stroke={filled ? '#E53E3E' : 'currentColor'}
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  subcategory,
  price,
  originalPrice,
  currency = '$',
  badge,
  defaultWishlisted = false,
  onToggleWishlist,
  onAddToCart,
  className = '',
}) => {
  const [wishlisted, setWishlisted] = useState(defaultWishlisted);

  const hasDiscount = originalPrice != null && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice! - price) / originalPrice!) * 100)
    : 0;

  const resolvedBadge: ProductBadge | null =
    badge ?? (hasDiscount ? { label: `-${discountPercent}%`, tone: 'red' } : null);

  const toggleWishlist = () => {
    setWishlisted((w) => {
      const next = !w;
      onToggleWishlist?.(next);
      return next;
    });
  };

  return (
    <div className={`cf-mp-card ${className}`.trim()}>
      <div className="cf-mp-card__image-wrap">
        {image ? (
          <img src={image} alt={name} className="cf-mp-card__image" loading="lazy" />
        ) : (
          <div className="cf-mp-card__image-placeholder" />
        )}

        {resolvedBadge && (
          <span className={`cf-mp-card__badge cf-mp-card__badge--${resolvedBadge.tone ?? 'dark'}`}>
            {resolvedBadge.label}
          </span>
        )}

        <button
          type="button"
          className={`cf-mp-card__wishlist${wishlisted ? ' cf-mp-card__wishlist--active' : ''}`}
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          aria-pressed={wishlisted}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>

      <div className="cf-mp-card__info">
        <h3 className="cf-mp-card__name">{name}</h3>
        {subcategory && <p className="cf-mp-card__subcat">{subcategory}</p>}

        <div className="cf-mp-card__pricing">
          <span className="cf-mp-card__price">
            {currency}
            {price.toFixed(0)}
          </span>
          {hasDiscount && (
            <span className="cf-mp-card__original">
              {currency}
              {originalPrice!.toFixed(0)}
            </span>
          )}
        </div>

        <button type="button" className="cf-mp-card__cta" onClick={onAddToCart}>
          <CartIcon />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
