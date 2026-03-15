import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { createSectionDefinition } from '../section-definition'

describe('createSectionDefinition', () => {
  it('creates a valid section definition', () => {
    const testSchema = z.object({ title: z.string() })
    const TestComponent = () => null

    const definition = createSectionDefinition({
      type: 'hero',
      variant: 'split',
      component: TestComponent,
      schema: testSchema,
      metadata: {
        name: 'Hero Split',
        category: 'hero',
        description: 'Split hero section',
        preview: '/previews/hero-split.png',
        tags: ['hero', 'split'],
        renderMode: 'server',
        dependencies: [],
        bundleImpact: 'light',
      },
      examples: {
        basic: { title: 'Test' },
      },
    })

    expect(definition.type).toBe('hero')
    expect(definition.variant).toBe('split')
    expect(definition.metadata.name).toBe('Hero Split')
  })

  it('validates example against schema', () => {
    const testSchema = z.object({ title: z.string() })
    const TestComponent = () => null

    const definition = createSectionDefinition({
      type: 'hero',
      variant: 'split',
      component: TestComponent,
      schema: testSchema,
      metadata: {
        name: 'Hero Split',
        category: 'hero',
        description: 'Test',
        preview: '/test.png',
        tags: [],
        renderMode: 'server',
        dependencies: [],
        bundleImpact: 'light',
      },
      examples: {
        basic: { title: 'Valid' },
      },
    })

    expect(() => definition.schema.parse({ title: 'Test' })).not.toThrow()
    expect(() => definition.schema.parse({ title: 123 })).toThrow()
  })
})
