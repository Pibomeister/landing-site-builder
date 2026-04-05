'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { NavTopSection } from '../../../../registry/schemas/nav.schema';
import { Container } from '../../primitives/layouts/container';

export interface NavTopProps extends NavTopSection {
  className?: string;
}

export function NavTop({
  logo,
  links,
  cta,
  sticky = true,
  transparent = false,
  container,
  className = '',
}: NavTopProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const positionClasses = sticky ? 'sticky top-0 z-50' : 'relative';
  const backgroundClasses = transparent
    ? 'absolute top-0 left-0 right-0'
    : 'bg-background/80 backdrop-blur-md border-b border-border';

  const logoHref = logo.href ?? '/';

  return (
    <header
      className={`${positionClasses} ${transparent ? backgroundClasses : backgroundClasses} ${className}`}
    >
      <Container size={container || 'xl'}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href={logoHref} className="flex items-center shrink-0">
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.text}
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            ) : (
              <span className="font-semibold text-lg">{logo.text}</span>
            )}
          </a>

          {/* Desktop nav links */}
          {links && links.length > 0 && (
            <nav className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            {cta && cta.type === 'link' && (
              <a
                href={cta.href}
                target={cta.target || '_self'}
                className="hidden md:inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {cta.label}
              </a>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg md:hidden">
          <div className="flex flex-col">
            {links &&
              links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            {cta && cta.type === 'link' && (
              <div className="px-4 py-3 border-t border-border">
                <a
                  href={cta.href}
                  target={cta.target || '_self'}
                  className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cta.label}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
