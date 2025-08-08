# Development Workflows and Commands

This guide provides validated workflows and commands for working effectively in the jest-preset-angular repository.

## Bootstrap, Build, and Test the Repository

### Core Commands

- Install dependencies: `yarn install --frozen-lockfile` -- takes 3 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
- Build the project: `yarn build` -- takes 4 seconds. Set timeout to 30 seconds.
- Run main test suite: `yarn test` -- takes 26 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
- Run ESM test suite: `yarn test-esm` -- takes 41 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
- Run example app tests: `yarn test-examples` -- takes 6.5 minutes. NEVER CANCEL. Set timeout to 10+ minutes.
- Run performance tests: `yarn test-perf` -- takes 7 seconds (requires `yarn --cwd performance` first). Set timeout to 30 seconds.

### Linting and Formatting

- Run ESLint: `yarn lint` -- takes 22 seconds. Set timeout to 60 seconds.
- Fix ESLint issues: `yarn lint-fix` -- takes similar time to lint. Set timeout to 60 seconds.
- Check Prettier formatting: `yarn lint-prettier-ci` -- takes 3 seconds. Set timeout to 30 seconds.
- Format with Prettier: `yarn lint-prettier` -- takes similar time. Set timeout to 30 seconds.

### Documentation

- Install website dependencies: `cd website && yarn install` -- takes 2 minutes. Set timeout to 5+ minutes.
- Build documentation: `yarn doc:build` -- takes 12 seconds. Set timeout to 60 seconds.
- Start development docs server: `yarn doc` (runs in website directory) -- starts immediately.

## Example Applications

The repository includes example Angular applications in `/examples/`:

- `example-app-v18` - Angular v18 example
- `example-app-v19` - Angular v19 example
- `example-app-v20` - Angular v20 example
- `example-app-monorepo` - Monorepo structure example

Each example app has these scripts:

- `yarn test` - CommonJS tests with isolatedModules: false (~21 seconds)
- `yarn test-isolated` - CommonJS tests with isolatedModules: true (~9 seconds)
- `yarn test-esm` - ESM tests with isolatedModules: false (~17 seconds)
- `yarn test-esm-isolated` - ESM tests with isolatedModules: true (~7 seconds)

## Validation Procedures

- Always run through the complete test suite after making changes to ensure nothing breaks.
- ALWAYS run both `yarn lint` and `yarn lint-prettier-ci` before committing or the CI will fail.
- Test your changes on at least one example application to ensure real-world compatibility.
- The preset must work with both CommonJS and ESM module formats.
- Verify that both isolated and non-isolated module compilation modes work correctly.

### Manual Testing Scenarios

After making changes, validate by:

1. Running `yarn build` to ensure the build completes successfully
2. Running `yarn test` to ensure core functionality works
3. Testing at least one example app: `cd examples/example-app-v20 && yarn test`
4. Verifying ESM compatibility: `yarn test-esm`
5. Checking all linting passes: `yarn lint && yarn lint-prettier-ci`

## Common Tasks

### Working with Example Apps

- Navigate to any example: `cd examples/example-app-v20`
- Install dependencies: `yarn install`
- Run tests: `yarn test`
- Note: Angular build (`yarn build`) may fail due to TypeScript strict mode errors in demo code - this is expected and not a blocker for Jest testing

### Performance Testing

- Install performance test dependencies: `yarn --cwd performance`
- Run performance tests: `yarn test-perf`
- Performance tests measure transformer execution time

### Working with Presets

The preset provides two main configurations:

- `createCjsPreset()` - For CommonJS projects
- `createEsmPreset()` - For ESM projects

Both support customization via options:

```typescript
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset({
    tsconfig: 'tsconfig.spec.json',
    isolatedModules: true,
  }),
};
```

### Package Dependencies

- **Node.js**: ^18.19.1 || ^20.11.1 || >=22.0.0
- **Package Manager**: Yarn 4.9.2 (uses .yarnrc.yml configuration)
- **Dependencies are managed via yarn.lock** - always use `yarn install --frozen-lockfile` for consistent installs

### CI/CD Pipeline

The project uses GitHub Actions with:

- Multi-OS testing (Ubuntu, Windows)
- Multi-Node.js version testing (18.x, 20.x, 22.x)
- Code quality checks (ESLint, Prettier)
- Performance testing
- Example app validation

### Troubleshooting Common Issues

- **Build failures**: Check TypeScript errors, run `yarn build` to see detailed output
- **Test failures**: Verify both CJS and ESM modes work, check isolatedModules settings
- **Peer dependency warnings**: These are expected due to Jest version differences with Angular CLI
- **Example app build errors**: TypeScript strict mode errors in demo code are known issues, focus on Jest test functionality

## Validation Suite

Always run the full validation suite before submitting changes:

```bash
yarn test && yarn test-esm && yarn lint && yarn lint-prettier-ci
```

This ensures compatibility across all supported configurations.
