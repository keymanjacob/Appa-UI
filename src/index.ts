/**
 * Component Factory — Barrel Exports
 *
 * Every public component is exported from this file. Consumers import like:
 *   import { Button, Spinner } from 'component-factory'
 */

// ── Atoms (smallest building blocks) ──────────────────────────
export { Button } from './atoms/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './atoms/Button/Button';

export { Spinner } from './atoms/Spinner/Spinner';
export type { SpinnerProps, SpinnerSize, SpinnerVariant } from './atoms/Spinner/Spinner';

export { Badge } from './atoms/Badge/Badge';
export type { BadgeProps, BadgeVariant } from './atoms/Badge/Badge';

export { Avatar } from './atoms/Avatar/Avatar';
export type { AvatarProps, AvatarSize } from './atoms/Avatar/Avatar';

export { Rating } from './atoms/Rating/Rating';
export type { RatingProps } from './atoms/Rating/Rating';

export { GlassButton } from './atoms/GlassButton/GlassButton';
export type { GlassButtonProps, GlassButtonVariant, GlassButtonSize } from './atoms/GlassButton/GlassButton';

// ── Molecules (2–3 atom combinations) ─────────────────────────
export { ProductCard } from './molecules/ProductCard/ProductCard';
export type { ProductCardProps, ProductBadge } from './molecules/ProductCard/ProductCard';

export { SearchInput } from './molecules/SearchInput/SearchInput';
export type { SearchInputProps } from './molecules/SearchInput/SearchInput';

export { Toast } from './molecules/Toast/Toast';
export type { ToastProps, ToastVariant } from './molecules/Toast/Toast';

export { ProgressBar } from './molecules/ProgressBar/ProgressBar';
export type { ProgressBarProps, ProgressBarVariant, ProgressBarSize } from './molecules/ProgressBar/ProgressBar';

export { GlassTabs } from './molecules/GlassTabs/GlassTabs';
export type { GlassTabsProps, GlassTabOption, GlassTabsVariant, GlassTabsSize } from './molecules/GlassTabs/GlassTabs';

// ── Organisms (complex composite patterns) ────────────────────
export { Carousel } from './organisms/Carousel/Carousel';
export type { CarouselProps, CarouselSlide, TextStyles } from './organisms/Carousel/types';
export { ProgressController } from './organisms/Carousel/ProgressController';
export type { ProgressControllerProps } from './organisms/Carousel/ProgressController';

export { AppNavbar } from './organisms/AppNavbar/AppNavbar';
export type { AppNavbarProps, NavItem, NavChild, NavCta } from './organisms/AppNavbar/AppNavbar';

// ── Tokens (for programmatic use) ─────────────────────────────
export { colors, spacing, radius } from './tokens';
