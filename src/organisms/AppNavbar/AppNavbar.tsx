/**
 * AppNavbar — production navigation bar with mega dropdowns + mobile drawer
 *
 * Origin: react-auth-app/src/components/EnhancedNavbar/index.tsx (the navbar the
 * app actually renders via NavbarWrapper). The earlier extraction was based on
 * the older, unused `modern/ModernNavbar`, whose menu did not open.
 *
 * Dependency stripping vs. source:
 *  - react-router `<Link>` → `<a>` + optional `onNavigate(href)`.
 *  - `react-i18next`, `useAuthStore`, `navigationConfig`, CDN/logo helpers and the
 *    inline search are removed; nav data and the right-side actions are props.
 *
 * Preserved behavior:
 *  - Desktop: clicking a nav item with children opens a full-width mega dropdown;
 *    clicking again (or outside) closes it.
 *  - Mobile (≤768px): hamburger opens a slide-down drawer with a header + close
 *    button and an overlay; items with children expand inline. Click-outside and
 *    selecting an item close the drawer.
 *  - Transparent→blurred scrolled state, dark/light themes.
 */

import React, { useState, useEffect, useRef } from 'react';
import './AppNavbar.css';

export interface NavChild {
  label: string;
  href?: string;
  description?: string;
}

export interface NavItem {
  /** Stable id used to track which dropdown is open */
  id: string;
  label: string;
  /** When set and there are no children, the item is a direct link */
  href?: string;
  /** Children turn the item into a mega-dropdown trigger */
  children?: NavChild[];
}

export interface NavCta {
  label: string;
  href?: string;
}

export interface AppNavbarProps {
  /** Brand / logo text (or any node) */
  brand: React.ReactNode;
  /** Optional logo image URL shown before the brand */
  logo?: string;
  /** Primary navigation items */
  items?: NavItem[];
  /** Optional pill/gold CTA shown before the right-side actions */
  cta?: NavCta;
  /** Right-side actions (language/user menus, avatar, etc.) */
  actions?: React.ReactNode;
  /** Color theme */
  theme?: 'dark' | 'light';
  /** Force the scrolled (more opaque) appearance regardless of scroll position */
  forceScrolled?: boolean;
  /** Fired when any link/child is clicked; receives its href */
  onNavigate?: (href: string | undefined) => void;
  className?: string;
}

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

export const AppNavbar: React.FC<AppNavbarProps> = ({
  brand,
  logo,
  items = [],
  cta,
  actions,
  theme = 'dark',
  forceScrolled = false,
  onNavigate,
  className = '',
}) => {
  const [scrolled, setScrolled] = useState(forceScrolled);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const navbarRef = useRef<HTMLElement>(null);

  // Scrolled state
  useEffect(() => {
    if (forceScrolled) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceScrolled]);

  // Close everything when clicking outside the navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setShowMobileMenu(false);
        setMobileDropdowns({});
      }
    };
    if (activeDropdown || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeDropdown, showMobileMenu]);

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
    setMobileDropdowns({});
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu((open) => {
      const next = !open;
      if (next) setActiveDropdown(null);
      return next;
    });
  };

  const handleDropdownToggle = (id: string) => {
    if (isMobile()) {
      setMobileDropdowns((prev) => {
        const next: Record<string, boolean> = {};
        Object.keys(prev).forEach((key) => (next[key] = false));
        next[id] = !prev[id];
        return next;
      });
    } else {
      setActiveDropdown((current) => (current === id ? null : id));
    }
  };

  const navigate = (href: string | undefined) => {
    onNavigate?.(href);
    setActiveDropdown(null);
    closeMobileMenu();
  };

  const dropdownItems = items.filter((i) => i.children && i.children.length > 0);
  const activeItem = dropdownItems.find((i) => i.id === activeDropdown);

  return (
    <>
      {/* Overlay for click-outside-to-close on mobile */}
      {showMobileMenu && <div className="mobile-menu-overlay" onClick={closeMobileMenu} aria-hidden="true" />}

      <nav
        ref={navbarRef}
        className={`enhanced-navbar enhanced-navbar--${theme} ${scrolled ? 'scrolled' : ''} ${className}`.trim()}
      >
        <div className="enhanced-navbar-container">
          {/* Brand */}
          <a href="#" className="enhanced-navbar-brand-section" onClick={() => navigate('/')}>
            {logo && (
              <span className="enhanced-navbar-logo">
                <img src={logo} alt="" width={42} height={42} style={{ borderRadius: 10 }} />
              </span>
            )}
            <span className="enhanced-navbar-brand">{brand}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={showMobileMenu}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          {/* Main Navigation */}
          <div className={`enhanced-navbar-menu ${showMobileMenu ? 'mobile-open' : ''}`}>
            {showMobileMenu && (
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">Menu</span>
                <button className="mobile-menu-close" onClick={closeMobileMenu} aria-label="Close menu">
                  ✕
                </button>
              </div>
            )}

            {items.map((item) => {
              const hasChildren = !!item.children && item.children.length > 0;
              const isActive = isMobile() ? mobileDropdowns[item.id] : activeDropdown === item.id;

              if (!hasChildren) {
                return (
                  <a
                    key={item.id}
                    href={item.href ?? '#'}
                    className="enhanced-navbar-link"
                    onClick={() => navigate(item.href)}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <div key={item.id} className="enhanced-dropdown">
                  <button
                    className={`enhanced-navbar-link dropdown-trigger ${isActive ? 'active' : ''}`}
                    onClick={() => handleDropdownToggle(item.id)}
                    aria-expanded={!!isActive}
                  >
                    {item.label} <span aria-hidden="true">▾</span>
                  </button>

                  {/* Mobile inline dropdown content */}
                  {isMobile() && mobileDropdowns[item.id] && (
                    <div className="mobile-dropdown-content">
                      {item.children!.map((child, idx) => (
                        <a
                          key={idx}
                          href={child.href ?? '#'}
                          className="mobile-dropdown-item"
                          onClick={() => navigate(child.href)}
                        >
                          <div className="mobile-dropdown-item-label">{child.label}</div>
                          {child.description && <div className="mobile-dropdown-item-desc">{child.description}</div>}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          {cta && (
            <a href={cta.href ?? '#'} className="enhanced-navbar-cta" onClick={() => navigate(cta.href)}>
              {cta.label}
            </a>
          )}

          {/* Right-side actions */}
          {actions && <div className="enhanced-navbar-actions">{actions}</div>}
        </div>

        {/* Full-width mega dropdown (desktop) */}
        {activeItem && (
          <div className="enhanced-mega-dropdown">
            <div className="enhanced-mega-dropdown-container">
              <div className="enhanced-mega-dropdown-content">
                <h2 className="enhanced-mega-dropdown-title">{activeItem.label}</h2>
                <div className="enhanced-mega-dropdown-grid">
                  {activeItem.children!.map((child, idx) => (
                    <a
                      key={idx}
                      href={child.href ?? '#'}
                      className="enhanced-mega-dropdown-item"
                      onClick={() => navigate(child.href)}
                    >
                      <div className="enhanced-mega-dropdown-item-label">{child.label}</div>
                      {child.description && <div className="enhanced-mega-dropdown-item-desc">{child.description}</div>}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default AppNavbar;
