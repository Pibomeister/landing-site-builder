'use client';

import { useState } from 'react';
import type { PricingCardsSection } from '../../../../registry/schemas/pricing.schema';
import { Container } from '../../primitives/layouts/container';
import { Heading } from '../../primitives/content/heading';

export interface PricingCardsProps extends PricingCardsSection {
  className?: string;
}

export function PricingCards({
  heading,
  plans,
  showToggle = true,
  container,
  className = '',
}: PricingCardsProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  // Compute max savings percentage for the toggle badge
  const savingsBadge = (() => {
    const examples = plans.map((p) => {
      const monthly = parseFloat(p.price.monthly.replace(/[^0-9.]/g, ''));
      const annual = parseFloat(p.price.annual.replace(/[^0-9.]/g, ''));
      if (!monthly || !annual || monthly <= annual) return 0;
      return Math.round(((monthly - annual) / monthly) * 100);
    });
    const max = Math.max(...examples);
    return max > 0 ? `Save ${max}%` : null;
  })();

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container size={container || 'lg'}>
        {/* Optional heading */}
        {heading && (
          <div className="mb-12">
            <Heading
              eyebrow={heading.eyebrow}
              title={heading.title}
              body={heading.body}
              align={heading.align || 'center'}
            />
          </div>
        )}

        {/* Billing toggle */}
        {showToggle && (
          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !isAnnual
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isAnnual
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
            </button>
            {isAnnual && savingsBadge && (
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {savingsBadge}
              </span>
            )}
          </div>
        )}

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isHighlighted = plan.highlighted ?? false;
            const currentPrice = isAnnual ? plan.price.annual : plan.price.monthly;
            const period = plan.period ?? '/mo';

            return (
              <div
                key={plan.name}
                className={
                  isHighlighted
                    ? 'relative bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl'
                    : 'relative bg-card border border-border rounded-2xl p-8'
                }
              >
                {/* Badge */}
                {plan.badge && (
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-4 ${
                      isHighlighted
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                {/* Plan name */}
                <h3 className="text-lg font-semibold">{plan.name}</h3>

                {/* Description */}
                {plan.description && (
                  <p
                    className={`text-sm mt-1 ${
                      isHighlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {plan.description}
                  </p>
                )}

                {/* Price */}
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-4xl font-bold">{currentPrice}</span>
                  <span
                    className={`text-sm mb-1 ${
                      isHighlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {period}
                  </span>
                </div>

                {/* Features list */}
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <span
                        className={`shrink-0 ${
                          isHighlighted ? 'text-primary-foreground' : 'text-primary'
                        }`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span
                        className={isHighlighted ? 'text-primary-foreground/90' : 'text-foreground'}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <a
                  href={plan.cta.href}
                  className={`mt-8 flex w-full items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isHighlighted
                      ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {plan.cta.label}
                </a>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
