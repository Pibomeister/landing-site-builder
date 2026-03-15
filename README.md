# Landing Site Builder

A composable, JSON-driven landing page builder designed for rapid deployment and systematic optimization. Build conversion-focused landing pages using a registry of pre-built sections.

## What is landing-site-builder?

Landing Site Builder is a framework for creating landing pages by composing sections from a JSON configuration. Instead of building custom pages from scratch, you choose and configure sections from a registry—each designed to serve specific visitor jobs (orient, build trust, communicate value, convert).

**Key Benefits:**
- **Fast deployment**: Go from idea to live page in minutes
- **Composable sections**: Mix and match pre-built, tested components
- **Type-safe configs**: JSON schemas with Zod validation
- **SEO optimized**: Server-side rendering with Next.js
- **Developer-friendly**: Clear extension points for custom sections

## Quick Start

```bash
# Clone and install
git clone <repository-url>
cd landing-site-builder
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

Your landing page is configured in `apps/demo/app/page.tsx`. Edit the JSON config to change sections.

## Documentation Structure

This repository uses a three-layer documentation approach for different skill levels:

### 1. Get Live (Operators)
**For:** Marketers, designers, non-technical users
**Goal:** Get a landing page running and customize basics

[Get Live Guide →](./docs/get-live.md)

Topics: Setup, deployment, customizing colors/fonts/content

### 2. Build Right Page (Page Builders)
**For:** Product managers, technical marketers, junior developers
**Goal:** Compose effective landing pages using the section registry

[Build Right Page Guide →](./docs/build-right-page.md)

Topics: JSON page configs, section categories, visitor jobs framework, choosing sections

### 3. Extend Platform (Platform Developers)
**For:** Senior developers, open-source contributors
**Goal:** Create new sections and extend the platform

[Extend Platform Guide →](./docs/extend-platform.md)

Topics: TDD workflow, section definition contract, schema design, testing requirements

### Component Registry
**For:** All users
**Reference:** Catalog of all available sections

[Component Registry →](./docs/components.md)

Browse sections by category, see examples, understand bundle impact

## Repository Structure

```
landing-site-builder/
├── packages/
│   └── core/               # @landing-builder/core package
│       ├── src/
│       │   ├── components/
│       │   │   └── landing/
│       │   │       ├── primitives/  # Shared UI components
│       │   │       └── sections/    # Landing page sections
│       │   ├── registry/            # Section registry and schemas
│       │   └── actions/             # Server actions (lead capture, etc)
│       └── package.json
├── apps/
│   └── demo/               # Demo Next.js app
│       ├── app/            # Next.js app router
│       └── package.json
├── docs/                   # Documentation
└── package.json            # Workspace root
```

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 with Tailwind CSS 4
- **Validation**: Zod schemas
- **Monorepo**: pnpm workspaces + Turbo
- **Testing**: Vitest + React Testing Library

## Common Tasks

### Run development server
```bash
pnpm dev
```

### Run type checking
```bash
pnpm typecheck
```

### Run tests
```bash
pnpm test
```

### Build for production
```bash
pnpm build
```

## Philosophy

Landing Site Builder follows these principles:

1. **Composition over customization**: Compose pages from sections rather than building from scratch
2. **Jobs-to-be-done framework**: Sections organized by visitor jobs (orient, trust, value, convert)
3. **Progressive complexity**: Easy to start, powerful to extend
4. **Type-safe by default**: Zod schemas catch config errors early
5. **Performance-conscious**: Server-rendered, bundle impact tracking

## Contributing

We welcome contributions! See the [Extend Platform Guide](./docs/extend-platform.md) for detailed information on:

- Creating new sections
- Testing requirements
- Code style and conventions
- Submission guidelines

## License

MIT
