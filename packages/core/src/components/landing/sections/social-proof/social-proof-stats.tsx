import { Container } from '../../primitives/layouts/container';
import type { SocialProofStats } from '../../../../registry/schemas/social-proof.schema';

export function SocialProofStats({ stats }: SocialProofStats) {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <Container size="lg">
        {/* grid-cols-2 at mobile ensures 4 items wrap to 2x2, not 3+1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {stat.icon && <span className="text-2xl block mb-1">{stat.icon}</span>}
              {/* font-display at font-normal (weight 400) — Calistoga is loaded at 400 only */}
              <div className="text-3xl md:text-4xl font-display font-normal text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
