import type { FeatureGridSection } from '../../../../registry/schemas/feature.schema';
import { Container } from '../../primitives/layouts/container';
import { Heading } from '../../primitives/content/heading';

export interface FeatureGridProps extends FeatureGridSection {
  className?: string;
}

export function FeatureGrid({
  heading,
  features,
  columns = 3,
  container,
  className = '',
}: FeatureGridProps) {
  const columnClasses: Record<2 | 3 | 4, string> = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container size={container || 'lg'}>
        {heading && (
          <div className="mb-12 text-center">
            <Heading
              eyebrow={heading.eyebrow}
              title={heading.title}
              body={heading.body}
              align={heading.align || 'center'}
            />
          </div>
        )}

        <div className={`grid grid-cols-1 gap-6 ${columnClasses[columns as 2 | 3 | 4]}`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-border rounded-xl p-6 hover:shadow-sm transition-shadow bg-card"
            >
              <div className="text-2xl text-primary mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
