# Jest Preset Angular

Jest Preset Angular is a comprehensive preset configuration for testing Angular projects with Jest. It provides transformers, environments, and configurations optimized for Angular development and testing workflows.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Detailed Instructions

This repository uses modular GitHub Copilot instructions organized by topic. Refer to the specific instruction files for comprehensive guidance:

### Core Development Guidelines

- **[Angular AI Development](instructions/angular-ai-development.md)** - Angular AI development with Model Context Protocol (MCP), custom prompts, system instructions, and AI-assisted code patterns
- **[TypeScript Best Practices](instructions/typescript-best-practices.md)** - All 50 comprehensive TypeScript best practices with detailed explanations and jest-preset-angular specific applications
- **[Development Workflows](instructions/development-workflows.md)** - Validated commands, build processes, testing procedures, and troubleshooting guides
- **[Repository Structure](instructions/repository-structure.md)** - Key files, directory organization, configuration patterns, and development environment setup

## Quick Start

### Essential Commands

- **Install**: `yarn install --frozen-lockfile` (3 minutes, timeout: 5+ minutes)
- **Build**: `yarn build` (4 seconds, timeout: 30 seconds)
- **Test**: `yarn test` (26 seconds, timeout: 60+ minutes)
- **Test Example Apps**: `yarn test-examples` (26 seconds, timeout: 60+ minutes)
- **Lint**: `yarn lint && yarn lint-prettier-ci` (25 seconds total)

### Validation Before Committing

Always run the full validation suite:

```bash
yarn test && yarn test-esm && yarn lint && yarn lint-prettier-ci
```

### Key Principles

- **Compatibility**: Support both CommonJS and ESM module formats
- **Angular Versions**: Maintain compatibility with Angular v18, v19, v20+
- **Module Compilation**: Test both isolated and non-isolated module compilation modes
- **Performance**: Consider transformer execution time and memory usage
- **Type Safety**: Use strict TypeScript settings and avoid `any` types

Refer to the detailed instruction files above for comprehensive guidance on each aspect of development in this repository.
