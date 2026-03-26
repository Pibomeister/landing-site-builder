import { Container } from '../../primitives/layouts/container';
import type { SocialProofStats } from '../../../../registry/schemas/social-proof.schema';

export function SocialProofStats({ stats }: SocialProofStats) {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <Container size="lg">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
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
