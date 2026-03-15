import type { SectionDefinition } from './section-definition';

// Registry storage: Map of `${type}-${variant}` → SectionDefinition
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registry = new Map<string, SectionDefinition<any>>();

/**
 * Create a unique key for a section type and variant
 */
function createKey(type: string, variant: string): string {
  return `${type}-${variant}`;
}

/**
 * Register a section definition in the registry
 * @throws Error if a section with the same type+variant is already registered
 */
export function registerSection<T>(definition: SectionDefinition<T>): void {
  const key = createKey(definition.type, definition.variant);

  if (registry.has(key)) {
    throw new Error(`Section "${definition.type}-${definition.variant}" is already registered`);
  }

  registry.set(key, definition);
}

/**
 * Retrieve a section definition by type and variant
 * @returns The section definition or undefined if not found
 */
export function getSection(type: string, variant: string): SectionDefinition | undefined {
  const key = createKey(type, variant);
  return registry.get(key);
}

/**
 * Get all registered sections
 * @returns Array of all section definitions
 */
export function getAllSections(): SectionDefinition[] {
  return Array.from(registry.values());
}

/**
 * Get all sections in a specific category
 * @param category The category to filter by
 * @returns Array of section definitions in the specified category
 */
export function getSectionsByCategory(category: string): SectionDefinition[] {
  return Array.from(registry.values()).filter(
    (definition) => definition.metadata.category === category
  );
}

/**
 * Clear all registered sections (useful for testing)
 */
export function clearRegistry(): void {
  registry.clear();
}
