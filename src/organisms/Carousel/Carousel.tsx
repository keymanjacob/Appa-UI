/**
 * Carousel — full-bleed hero carousel engine
 *
 * Origin: react-auth-app/src/components/Carousel/index.tsx
 * Self-contained extraction: i18n (`useTranslation`) removed; slides carry their
 * own text. Auto-slide, progress timer, swipe, scroll-fade controller, center +
 * split layouts and per-slide text styling are all preserved.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { CarouselProps, CarouselSlide } from './types';
import { ProgressController } from './ProgressController';
import './Carousel.css';

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoSlideInterval = 5000,
  showArrows = false,
  showDots = false,
  showProgressController = true,
  showPauseButton = true,
  showProgress = true,
  loop = true,
  pauseOnHover = false,
  animationDuration = 600,
  defaultImageOpacity = 0.6,
  defaultOverlayOpacity = 0.4,
  overlayColor = '#000000',
  textShadow = '0 2px 10px rgba(0, 0, 0, 0.8)',
  controllerSize = 'medium',
  defaultTextStyles,
  titleFontSize = 'clamp(2.5rem, 8vw, 5rem)',
  subtitleFontSize = '0.875rem',
  descriptionFontSize = 'clamp(1rem, 2vw, 1.25rem)',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const carouselRef = useRef<HTMLDivElement>(null);

  // Touch swipe state for mobile/tablet
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (loop) {
        setCurrentIndex((index + totalSlides) % totalSlides);
      } else {
        setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
      }
    },
    [loop, totalSlides],
  );

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Reset progress and start time when slide changes or pause state changes
  useEffect(() => {
    if (!isPaused && autoSlideInterval > 0) {
      startTimeRef.current = Date.now();
      setProgress(0);
    }
  }, [currentIndex, isPaused, autoSlideInterval]);

  // Progress tracking + auto-slide
  useEffect(() => {
    if (autoSlideInterval > 0 && !isPaused && totalSlides > 1) {
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / autoSlideInterval) * 100, 100);
        setProgress(newProgress);
      }, 50);

      intervalRef.current = setInterval(() => {
        goToNext();
        startTimeRef.current = Date.now();
        setProgress(0);
      }, autoSlideInterval);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [autoSlideInterval, isPaused, goToNext, totalSlides]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  // Touch swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const x = e.touches[0]?.clientX ?? 0;
    touchStartX.current = x;
    touchEndX.current = x;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0]?.clientX ?? touchEndX.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) >= minSwipeDistance) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      startTimeRef.current = Date.now();
      setProgress(0);
    }
  }, [goToNext, goToPrev]);

  const handleTogglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const handleDotClick = useCallback(
    (index: number) => {
      goToSlide(index);
      startTimeRef.current = Date.now();
      setProgress(0);
    },
    [goToSlide],
  );

  // Scroll tracking for progress controller fade
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const carouselHeight = rect.height;
      const carouselTop = rect.top;

      if (carouselTop >= 0) {
        setScrollProgress(0);
      } else {
        const scrolledAmount = Math.abs(carouselTop);
        const fadeStartThreshold = carouselHeight * 0.3;
        const fadeEndThreshold = carouselHeight * 0.7;

        if (scrolledAmount < fadeStartThreshold) {
          setScrollProgress(0);
        } else if (scrolledAmount >= fadeEndThreshold) {
          setScrollProgress(1);
        } else {
          const fadeRange = fadeEndThreshold - fadeStartThreshold;
          const fadeProgress = (scrolledAmount - fadeStartThreshold) / fadeRange;
          setScrollProgress(Math.min(1, Math.max(0, fadeProgress)));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderSlide = (slide: CarouselSlide, index: number) => {
    const isActive = index === currentIndex;
    const imageOpacity = slide.imageOpacity ?? defaultImageOpacity;
    const slideOverlayOpacity = slide.overlayOpacity ?? defaultOverlayOpacity;
    const isSplitLayout = slide.layout === 'split';

    const textStyles = { ...defaultTextStyles, ...slide.textStyles };

    const title = slide.title;
    const subtitle = slide.subtitle;
    const description = slide.description;
    const ctaText = slide.ctaText;
    const features = slide.features ?? [];

    return (
      <div
        key={slide.id}
        className={`carousel__slide ${isActive ? 'carousel__slide--active' : ''} ${
          isSplitLayout ? 'carousel__slide--split' : ''
        }`}
        style={
          {
            '--carousel-animation-duration': `${animationDuration}ms`,
            ...(slide.backgroundColor && { backgroundColor: slide.backgroundColor }),
          } as React.CSSProperties
        }
      >
        {slide.imageUrl && !isSplitLayout && (
          <div
            className="carousel__slide-background"
            style={{ backgroundImage: `url(${slide.imageUrl})`, opacity: imageOpacity }}
          />
        )}

        {!isSplitLayout && (
          <div
            className="carousel__slide-overlay"
            style={{ backgroundColor: overlayColor, opacity: slideOverlayOpacity }}
          />
        )}

        {isSplitLayout ? (
          /* Split Layout: Text Left, Diagram Right */
          <div className="carousel__slide-split-content">
            <div className="carousel__slide-split-text">
              {subtitle && (
                <div className="carousel__slide-subtitle">
                  <span
                    className="carousel__slide-subtitle-text"
                    style={{
                      fontSize: subtitleFontSize,
                      ...(textStyles.subtitleColor && { color: textStyles.subtitleColor }),
                    }}
                  >
                    {subtitle}
                  </span>
                </div>
              )}

              <h1 className="carousel__slide-title carousel__slide-title--left" style={{ fontSize: titleFontSize }}>
                {title.split(' ').map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="carousel__slide-title-word"
                    style={{
                      animationDelay: `${wordIndex * 0.1}s`,
                      textShadow,
                      ...(textStyles.titleColor && { color: textStyles.titleColor }),
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {description && (
                <p
                  className="carousel__slide-description carousel__slide-description--left"
                  style={{
                    fontSize: descriptionFontSize,
                    textShadow,
                    ...(textStyles.descriptionColor && { color: textStyles.descriptionColor }),
                  }}
                >
                  {description}
                </p>
              )}

              {features.length > 0 && (
                <ul className="carousel__slide-features">
                  {features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="carousel__slide-feature"
                      style={{
                        animationDelay: `${0.3 + idx * 0.1}s`,
                        ...(textStyles.featureTextColor && { color: textStyles.featureTextColor }),
                      }}
                    >
                      <svg
                        className="carousel__slide-feature-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ ...(textStyles.featureIconColor && { stroke: textStyles.featureIconColor }) }}
                      >
                        <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {ctaText && slide.ctaLink && (
                <a
                  href={slide.ctaLink}
                  className="carousel__slide-cta"
                  style={{
                    ...(textStyles.ctaColor && { color: textStyles.ctaColor }),
                    ...(textStyles.ctaBorderColor && { borderColor: textStyles.ctaBorderColor }),
                  }}
                  onMouseEnter={(e) => {
                    if (textStyles.ctaHoverBgColor) e.currentTarget.style.backgroundColor = textStyles.ctaHoverBgColor;
                    if (textStyles.ctaHoverTextColor) e.currentTarget.style.color = textStyles.ctaHoverTextColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    if (textStyles.ctaColor) e.currentTarget.style.color = textStyles.ctaColor;
                  }}
                >
                  <span>{ctaText}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>

            <div className="carousel__slide-split-diagram">
              {slide.diagramUrl && (
                <img src={slide.diagramUrl} alt={title} className="carousel__slide-diagram-image" />
              )}
            </div>
          </div>
        ) : (
          /* Center Layout (default) */
          <div className="carousel__slide-content">
            {subtitle && (
              <div className="carousel__slide-subtitle">
                <span
                  className="carousel__slide-subtitle-text"
                  style={{
                    fontSize: subtitleFontSize,
                    ...(textStyles.subtitleColor && { color: textStyles.subtitleColor }),
                  }}
                >
                  {subtitle}
                </span>
              </div>
            )}

            <h1 className="carousel__slide-title" style={{ fontSize: titleFontSize }}>
              {title.split(' ').map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="carousel__slide-title-word"
                  style={{
                    animationDelay: `${wordIndex * 0.1}s`,
                    textShadow,
                    ...(textStyles.titleColor && { color: textStyles.titleColor }),
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {description && (
              <p
                className="carousel__slide-description"
                style={{
                  fontSize: descriptionFontSize,
                  textShadow,
                  ...(textStyles.descriptionColor && { color: textStyles.descriptionColor }),
                }}
              >
                {description}
              </p>
            )}

            {ctaText && slide.ctaLink && (
              <a
                href={slide.ctaLink}
                className="carousel__slide-cta"
                style={{
                  ...(textStyles.ctaColor && { color: textStyles.ctaColor }),
                  ...(textStyles.ctaBorderColor && { borderColor: textStyles.ctaBorderColor }),
                }}
                onMouseEnter={(e) => {
                  if (textStyles.ctaHoverBgColor) e.currentTarget.style.backgroundColor = textStyles.ctaHoverBgColor;
                  if (textStyles.ctaHoverTextColor) e.currentTarget.style.color = textStyles.ctaHoverTextColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  if (textStyles.ctaColor) e.currentTarget.style.color = textStyles.ctaColor;
                }}
              >
                <span>{ctaText}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={carouselRef}
      className={`carousel ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel__slides-container">
        {slides.map((slide, index) => renderSlide(slide, index))}
      </div>

      {showArrows && totalSlides > 1 && (
        <>
          <button className="carousel__nav carousel__nav--prev" onClick={goToPrev} aria-label="Previous">
            <svg className="carousel__nav-icon" viewBox="0 0 24 24">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>
          <button className="carousel__nav carousel__nav--next" onClick={goToNext} aria-label="Next">
            <svg className="carousel__nav-icon" viewBox="0 0 24 24">
              <path d="M9 18L15 12L9 6" />
            </svg>
          </button>
        </>
      )}

      {showDots && totalSlides > 1 && (
        <div className="carousel__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel__dot ${index === currentIndex ? 'carousel__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Apple-style Progress Controller */}
      {showProgressController && totalSlides > 1 && (
        <div className="carousel__progress-controller-wrapper">
          <ProgressController
            totalSlides={totalSlides}
            currentIndex={currentIndex}
            isPaused={isPaused}
            progress={progress}
            onDotClick={handleDotClick}
            onTogglePause={handleTogglePause}
            showPauseButton={showPauseButton}
            showProgress={showProgress}
            scrollProgress={scrollProgress}
            enableScrollFade={true}
            controllerSize={controllerSize}
          />
        </div>
      )}
    </div>
  );
};

export default Carousel;
