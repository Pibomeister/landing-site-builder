import type { SectionHeading } from '../../../../registry/schemas'

export interface HeadingProps extends SectionHeading {
  className?: string
}

export function Heading({ eyebrow, title, body, align = 'left', className = '' }: HeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={`${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {body && (
        <p className="mt-4 text-lg text-muted-foreground">
          {body}
        </p>
      )}
    </div>
  )
}
