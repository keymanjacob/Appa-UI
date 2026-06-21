/**
 * Carousel Component Types
 *
 * Origin: react-auth-app/src/components/Carousel/types.ts
 * Dependency stripping: i18n keys (titleKey, subtitleKey, …) are replaced with
 * direct text props (title, subtitle, …) so the component is self-contained.
 */

/**
 * Text styling configuration for carousel slides.
 * All properties are optional and fall back to token-based defaults.
 */
export interface TextStyles {
  /** Title color (default: --color-text-primary) */
  titleColor?: string;
  /** Subtitle color (default: --color-text-secondary) */
  subtitleColor?: string;
  /** Description color (default: --color-text-secondary) */
  descriptionColor?: string;
  /** CTA button text color */
  ctaColor?: string;
  /** CTA button border color */
  ctaBorderColor?: string;
  /** CTA button background color on hover */
  ctaHoverBgColor?: string;
  /** CTA button text color on hover */
  ctaHoverTextColor?: string;
  /** Feature list icon color — split layout only */
  featureIconColor?: string;
  /** Feature list text color — split layout only */
  featureTextColor?: string;
}

export interface CarouselSlide {
  id: string;
  /** Eyebrow/subtitle text */
  subtitle?: string;
  /** Main title (words animate in individually) */
  title: string;
  /** Body/description text */
  description?: string;
  /** CTA button label */
  ctaText?: string;
  /** Link for CTA button */
  ctaLink?: string;
  /** Background image URL */
  imageUrl?: string;
  /** Image opacity (0-1) */
  imageOpacity?: number;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Layout type: 'center' (default) or 'split' (text left, diagram right) */
  layout?: 'center' | 'split';
  /** Diagram/feature image URL for split layout (shown on the right side) */
  diagramUrl?: string;
  /** Feature list items for split layout */
  features?: string[];
  /** Background color override (useful for solid color backgrounds) */
  backgroundColor?: string;
  /** Custom text styles for this slide (overrides default text styles) */
  textStyles?: TextStyles;
}

export interface CarouselConfig {
  /** Array of slides to display */
  slides: CarouselSlide[];
  /** Time in milliseconds between auto-slides (0 to disable auto-slide) */
  autoSlideInterval?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Show the Apple-style progress controller */
  showProgressController?: boolean;
  /** Show pause/play button in progress controller */
  showPauseButton?: boolean;
  /** Show progress indicator on active dot */
  showProgress?: boolean;
  /** Enable infinite loop */
  loop?: boolean;
  /** Pause auto-slide on hover */
  pauseOnHover?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Default image opacity for slides */
  defaultImageOpacity?: number;
  /** Default overlay opacity for slides */
  defaultOverlayOpacity?: number;
  /** Overlay color */
  overlayColor?: string;
  /** Text shadow for readability */
  textShadow?: string;
  /** Controller size preset: 'small' | 'medium' | 'large' (default: 'medium') */
  controllerSize?: 'small' | 'medium' | 'large';
  /** Default text styles for all slides (can be overridden per slide) */
  defaultTextStyles?: TextStyles;
  /** Title font size (CSS value, e.g., '4rem', 'clamp(2rem, 8vw, 6rem)') */
  titleFontSize?: string;
  /** Subtitle font size (CSS value) */
  subtitleFontSize?: string;
  /** Description font size (CSS value) */
  descriptionFontSize?: string;
}

export interface CarouselProps extends CarouselConfig {
  /** Additional CSS class name */
  className?: string;
}
