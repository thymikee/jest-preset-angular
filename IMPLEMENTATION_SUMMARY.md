# Implementation Summary: Add extraProviders Parameter

## Feature Request
Add `extraProviders?: StaticProvider[]` parameter to `setupZonelessTestEnv` and `setupZoneTestEnv` functions to allow mocking platform providers that cannot be configured via `TestBed.configureTestingModule`.

## Implementation Details

### Files Modified
1. **Type Definitions (4 files)**
   - `setup-env/zone/index.d.ts`
   - `setup-env/zone/index.d.mts`
   - `setup-env/zoneless/index.d.ts`
   - `setup-env/zoneless/index.d.mts`

2. **Implementation Files (4 files)**
   - `setup-env/zone/index.js`
   - `setup-env/zone/index.mjs`
   - `setup-env/zoneless/index.js`
   - `setup-env/zoneless/index.mjs`

3. **Test Files (1 file)**
   - `src/config/setup-env.spec.ts`

4. **Documentation (1 file)**
   - `EXAMPLE_USAGE.md`

### Key Changes

#### Type Definitions
- Added and exported `SetupOptions` interface that extends `TestEnvironmentOptions`
- Interface includes optional `extraProviders?: StaticProvider[]` field
- Maintains backward compatibility (parameter is optional)

#### Implementation
- Extract `extraProviders` from options with fallback to empty array (`options?.extraProviders ?? []`)
- Merge extraProviders with existing COMPILER_OPTIONS provider using spread operator
- Pass merged providers to `platformBrowserTesting()` (Angular v20+) or `platformBrowserDynamicTesting()` (Angular v19-)
- Works with all Angular versions (v18, v19, v20, v21+)

#### Testing
- Added 4 new test cases (2 for zone, 2 for zoneless)
- Tests verify both CJS and ESM implementations
- Tests confirm extraProviders are correctly merged with platform providers
- All 8 existing tests continue to pass

## Usage Example

```typescript
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv({
  extraProviders: [
    {
      provide: PlatformService,
      useValue: mockPlatformService,
    },
  ],
});
```

## Test Results

✅ All unit tests pass (63 tests)
✅ All E2E tests pass (36 tests)
✅ All ESM tests pass
✅ Linting passes
✅ Code formatting passes
✅ No security vulnerabilities detected
✅ Backward compatible

## Benefits

1. **More Flexible Configuration**: Users can now mock platform-level services
2. **Better Test Isolation**: Platform services can be properly mocked for all tests
3. **Cleaner Test Setup**: Configure platform services once in setup file
4. **Maintains Simplicity**: Optional parameter, no breaking changes
5. **Type Safety**: Exported interface allows type-safe usage

## Compatibility

- ✅ Angular v18, v19, v20, v21+
- ✅ CommonJS module format
- ✅ ESM module format
- ✅ Isolated and non-isolated module compilation
- ✅ Zone.js and Zoneless environments
