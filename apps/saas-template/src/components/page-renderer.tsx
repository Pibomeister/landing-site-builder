import { getSection } from '@landing-builder/core/registry';

export interface SectionConfig {
  type: string;
  variant: string;
  props: Record<string, unknown>;
}

export interface PageConfig {
  sections: SectionConfig[];
}

interface PageRendererProps {
  config: PageConfig;
}

interface SectionErrorProps {
  type: string;
  variant: string;
  error: string;
}

function SectionError({ type, variant, error }: SectionErrorProps) {
  return (
    <div className="border border-destructive/30 bg-destructive/10 p-6 rounded-lg my-4">
      <h3 className="text-destructive font-semibold mb-2">
        Section Error: {type}-{variant}
      </h3>
      <p className="text-destructive/80 text-sm">{error}</p>
    </div>
  );
}

export function PageRenderer({ config }: PageRendererProps) {
  return (
    <>
      {config.sections.map((sectionConfig, index) => {
        const { type, variant, props } = sectionConfig;

        // Look up the section in the registry
        const sectionDef = getSection(type, variant);

        if (!sectionDef) {
          return (
            <SectionError
              key={`error-${index}`}
              type={type}
              variant={variant}
              error={`Section "${type}-${variant}" not found in registry. Make sure it's registered.`}
            />
          );
        }

        // Validate props against the schema
        try {
          const validatedProps = sectionDef.schema.parse(props) as Record<string, unknown>;
          const Component = sectionDef.component;

          return <Component key={`${type}-${variant}-${index}`} {...validatedProps} />;
        } catch (error) {
          if (error && typeof error === 'object' && 'errors' in error) {
            const zodError = error as {
              errors: Array<{ path: Array<string | number>; message: string }>;
            };
            const errorMessages = zodError.errors
              .map((err) => `${err.path.join('.')}: ${err.message}`)
              .join(', ');

            return (
              <SectionError
                key={`error-${index}`}
                type={type}
                variant={variant}
                error={`Invalid props: ${errorMessages}`}
              />
            );
          }

          return (
            <SectionError
              key={`error-${index}`}
              type={type}
              variant={variant}
              error={`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`}
            />
          );
        }
      })}
    </>
  );
}
