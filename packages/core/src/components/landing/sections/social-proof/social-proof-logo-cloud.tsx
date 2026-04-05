import type { SocialProofLogoCloudSection } from '../../../../registry/schemas/social-proof.schema';
import { Container } from '../../primitives/layouts/container';

export interface SocialProofLogoCloudProps extends SocialProofLogoCloudSection {
  className?: string;
}

export function SocialProofLogoCloud({
  label,
  logos,
  marquee = false,
  container,
  className = '',
}: SocialProofLogoCloudProps) {
  return (
    <section className={`py-12 border-y border-border ${className}`}>
      <Container size={container || 'lg'}>
        {label && <p className="text-sm text-muted-foreground text-center mb-8">{label}</p>}
      </Container>

      {marquee ? (
        <div className="overflow-hidden">
          <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
          <div
            className="flex items-center animate-[marquee_20s_linear_infinite]"
            style={{ width: 'max-content' }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="mx-8 flex-shrink-0">
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noopener noreferrer">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-8 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition"
                    />
                  </a>
                ) : (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Container size={container || 'lg'}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos.map((logo, index) => (
              <div key={index}>
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noopener noreferrer">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-8 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition"
                    />
                  </a>
                ) : (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition"
                  />
                )}
              </div>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
