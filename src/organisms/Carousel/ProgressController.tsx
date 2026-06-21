/**
 * ProgressController — Apple-style carousel progress indicator
 *
 * Origin: react-auth-app/src/components/Carousel/CarouselProgressController.tsx
 * Dependency stripping: i18n labels replaced with plain English strings.
 */

import React from 'react';
import './ProgressController.css';

export interface ProgressControllerProps {
  /** Total number of slides */
  totalSlides: number;
  /** Current active slide index (0-indexed) */
  currentIndex: number;
  /** Whether auto-slide is paused */
  isPaused: boolean;
  /** Progress percentage (0-100) for current slide timer */
  progress: number;
  /** Callback when a dot is clicked */
  onDotClick: (index: number) => void;
  /** Callback when pause/play button is clicked */
  onTogglePause: () => void;
  /** Show pause/play button */
  showPauseButton?: boolean;
  /** Show progress indicator on active dot */
  showProgress?: boolean;
  /** Scroll progress (0-1) for fade/transform effect */
  scrollProgress?: number;
  /** Enable scroll-based fade out effect */
  enableScrollFade?: boolean;
  /** Controller size preset: 'small' | 'medium' | 'large' */
  controllerSize?: 'small' | 'medium' | 'large';
  /** Additional CSS class */
  className?: string;
}

export const ProgressController: React.FC<ProgressControllerProps> = ({
  totalSlides,
  currentIndex,
  isPaused,
  progress,
  onDotClick,
  onTogglePause,
  showPauseButton = true,
  showProgress = true,
  scrollProgress = 0,
  enableScrollFade = true,
  controllerSize = 'medium',
  className = '',
}) => {
  // Calculate scroll-based styles
  const getScrollStyles = (): React.CSSProperties => {
    if (!enableScrollFade || scrollProgress <= 0) {
      return {};
    }

    // scrollProgress: 0 = fully visible, 1 = fully hidden
    const opacity = Math.max(0, 1 - scrollProgress * 1.5);
    const scale = Math.max(0.6, 1 - scrollProgress * 0.4);

    return {
      opacity,
      transform: `translateX(-50%) scale(${scale})`,
      pointerEvents: opacity < 0.3 ? 'none' : 'auto',
    } as React.CSSProperties;
  };

  // Calculate dot container scroll styles (collapse to circle)
  const getDotsContainerStyles = (): React.CSSProperties => {
    if (!enableScrollFade || scrollProgress <= 0) {
      return {};
    }

    const gapReduction = scrollProgress * 0.5; // 0.5rem -> 0
    const paddingReduction = scrollProgress * 0.5;

    return {
      gap: `${Math.max(0, 0.5 - gapReduction)}rem`,
      padding: `${Math.max(0.375, 0.625 - paddingReduction)}rem ${Math.max(0.5, 1 - paddingReduction)}rem`,
    };
  };

  // Calculate individual dot styles (collapse non-active dots)
  const getDotStyles = (isActive: boolean): React.CSSProperties => {
    if (!enableScrollFade || scrollProgress <= 0) {
      return {};
    }

    if (isActive) {
      const widthReduction = scrollProgress * 32; // 40px -> 8px
      return {
        width: `${Math.max(8, 40 - widthReduction)}px`,
      };
    } else {
      const opacity = Math.max(0, 1 - scrollProgress * 2);
      const scale = Math.max(0, 1 - scrollProgress);
      return {
        opacity,
        transform: `scale(${scale})`,
        width: opacity < 0.1 ? '0px' : '8px',
        margin: opacity < 0.1 ? '0' : undefined,
      };
    }
  };

  return (
    <div
      className={`carousel-progress-controller carousel-progress-controller--${controllerSize} ${className} ${
        scrollProgress > 0.5 ? 'carousel-progress-controller--collapsed' : ''
      }`}
      style={getScrollStyles()}
    >
      {/* Dots Container */}
      <div className="carousel-progress-controller__dots-container" style={getDotsContainerStyles()}>
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              className={`carousel-progress-controller__dot ${
                isActive ? 'carousel-progress-controller__dot--active' : ''
              }`}
              onClick={() => onDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
              style={getDotStyles(isActive)}
            >
              {/* Progress bar inside active dot */}
              {isActive && showProgress && (
                <span
                  className="carousel-progress-controller__progress-bar"
                  style={{
                    width: isPaused ? '100%' : `${progress}%`,
                    transition: isPaused ? 'none' : 'width 100ms linear',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Pause/Play Button */}
      {showPauseButton && (
        <button
          className="carousel-progress-controller__pause-btn"
          onClick={onTogglePause}
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? (
            <svg className="carousel-progress-controller__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="carousel-progress-controller__icon" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default ProgressController;
