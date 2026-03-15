import { describe, it, expect, beforeEach } from 'vitest'
import { z } from 'zod'
import {
  registerSection,
  getSection,
  getAllSections,
  getSectionsByCategory,
  clearRegistry,
} from '../section-registry'
import type { SectionDefinition } from '../section-definition'

// Mock component for testing
function MockComponent({ text }: { text: string }) {
  return <div>{text}</div>
}

// Mock schema for testing
const mockSchema = z.object({
  text: z.string(),
})

describe('Section Registry', () => {
  beforeEach(() => {
    clearRegistry()
  })

  describe('registerSection', () => {
    it('should register a section successfully', () => {
      const definition: SectionDefinition<{ text: string }> = {
        type: 'hero',
        variant: 'split',
        component: MockComponent,
        schema: mockSchema,
        metadata: {
          name: 'Hero Split',
          category: 'orient',
          description: 'Test description',
          preview: '/preview.png',
          tags: ['hero'],
          renderMode: 'server',
          dependencies: [],
          bundleImpact: 'light',
        },
        examples: {
          basic: { text: 'Hello' },
        },
      }

      registerSection(definition)
      const retrieved = getSection('hero', 'split')
      expect(retrieved).toBeDefined()
      expect(retrieved?.metadata.name).toBe('Hero Split')
    })

    it('should prevent duplicate registration of same type+variant', () => {
      const definition: SectionDefinition<{ text: string }> = {
        type: 'hero',
        variant: 'split',
        component: MockComponent,
        schema: mockSchema,
        metadata: {
          name: 'Hero Split',
          category: 'orient',
          description: 'Test description',
          preview: '/preview.png',
          tags: ['hero'],
          renderMode: 'server',
          dependencies: [],
          bundleImpact: 'light',
        },
        examples: {
          basic: { text: 'Hello' },
        },
      }

      registerSection(definition)

      expect(() => {
        registerSection(definition)
      }).toThrow('already registered')
    })
  })

  describe('getSection', () => {
    it('should retrieve section by type and variant', () => {
      const definition: SectionDefinition<{ text: string }> = {
        type: 'hero',
        variant: 'split',
        component: MockComponent,
        schema: mockSchema,
        metadata: {
          name: 'Hero Split',
          category: 'orient',
          description: 'Test description',
          preview: '/preview.png',
          tags: ['hero'],
          renderMode: 'server',
          dependencies: [],
          bundleImpact: 'light',
        },
        examples: {
          basic: { text: 'Hello' },
        },
      }

      registerSection(definition)
      const retrieved = getSection('hero', 'split')

      expect(retrieved).toBeDefined()
      expect(retrieved?.type).toBe('hero')
      expect(retrieved?.variant).toBe('split')
      expect(retrieved?.metadata.name).toBe('Hero Split')
    })

    it('should return undefined for non-existent section', () => {
      const retrieved = getSection('nonexistent', 'variant')
      expect(retrieved).toBeUndefined()
    })
  })

  describe('getAllSections', () => {
    it('should return all registered sections', () => {
      const definition1: SectionDefinition<{ text: string }> = {
        type: 'hero',
        variant: 'split',
        component: MockComponent,
        schema: mockSchema,
        metadata: {
          name: 'Hero Split',
          category: 'orient',
          description: 'Test description',
          preview: '/preview.png',
          tags: ['hero'],
          renderMode: 'server',
          dependencies: [],
          bundleImpact: 'light',
        },
        examples: {
          basic: { text: 'Hello' },
        },
      }

      const definition2: SectionDefinition<{ text: string }> = {
        type: 'hero',
        variant: 'centered',
        component: MockComponent,
        schema: mockSchema,
        metadata: {
          name: 'Hero Centered',
          category: 'orient',
          description: 'Test description',
          preview: '/preview.png',
          tags: ['hero'],
          renderMode: 'server',
          dependencies: [],
          bundleImpact: 'light',
        },
        examples: {
          basic: { text: 'Hello' },
        },
      }

      registerSection(definition1)
      registerSection(definition2)

      const allSections = getAllSections()
      expect(allSections).toHaveLength(2)
      expect(allSections.map(s => s.variant)).toContain('split')
      expect(allSections.map(s => s.variant)).toContain('centered')
    })

    it('should return empty array when no sections registered', () => {
      const allSections = getAllSections()
      expect(allSections).toEqual([])
    })
  })

  describe('getSectionsByCategory', () => {
    it('should return sections filtered by category', () => {
      const orientDefinition: SectionDefinition<{ text: string }> = {
        type: 'hero',
        variant: 'split',
        component: MockComponent,
        schema: mockSchema,
        metadata: {
          name: 'Hero Split',
          category: 'orient',
          description: 'Test description',
          preview: '/preview.png',
          tags: ['hero'],
          renderMode: 'server',
          dependencies: [],
          bundleImpact: 'light',
        },
        examples: {
          basic: { text: 'Hello' },
        },
      }

      const engageDefinition: SectionDefinition<{ text: string }> = {
        type: 'cta',
        variant: 'banner',
        component: MockComponent,
        schema: mockSchema,
        metadata: {
          name: 'CTA Banner',
          category: 'engage',
          description: 'Test description',
          preview: '/preview.png',
          tags: ['cta'],
          renderMode: 'server',
          dependencies: [],
          bundleImpact: 'light',
        },
        examples: {
          basic: { text: 'Hello' },
        },
      }

      registerSection(orientDefinition)
      registerSection(engageDefinition)

      const orientSections = getSectionsByCategory('orient')
      expect(orientSections).toHaveLength(1)
      expect(orientSections[0].metadata.category).toBe('orient')
      expect(orientSections[0].type).toBe('hero')
    })

    it('should return empty array for category with no sections', () => {
      const sections = getSectionsByCategory('nonexistent')
      expect(sections).toEqual([])
    })
  })
})
