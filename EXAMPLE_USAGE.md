# Example Usage: extraProviders in Setup Functions

This document demonstrates how to use the new `extraProviders` parameter in `setupZoneTestEnv` and `setupZonelessTestEnv` functions.

## Basic Usage

### With setupZoneTestEnv

```typescript
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

// Mock platform service
const mockPlatformService = {
  getPlatformName: () => 'Test Platform'
};

setupZoneTestEnv({
  teardown: {
    destroyAfterEach: true,
  },
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
  extraProviders: [
    {
      provide: PlatformService,
      useValue: mockPlatformService,
    },
  ],
});
```

### With setupZonelessTestEnv

```typescript
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

// Mock platform service
const mockPlatformService = {
  getPlatformName: () => 'Test Platform'
};

setupZonelessTestEnv({
  teardown: {
    destroyAfterEach: true,
  },
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
  extraProviders: [
    {
      provide: PlatformService,
      useValue: mockPlatformService,
    },
  ],
});
```

## Advanced Usage

### Multiple Providers

You can provide multiple platform providers at once:

```typescript
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { DOCUMENT } from '@angular/common';

setupZoneTestEnv({
  extraProviders: [
    {
      provide: PlatformService,
      useValue: mockPlatformService,
    },
    {
      provide: 'API_URL',
      useValue: 'https://test.api.com',
    },
    {
      provide: DOCUMENT,
      useValue: mockDocument,
    },
  ],
});
```

### Factory Providers

You can use factory providers as well:

```typescript
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  extraProviders: [
    {
      provide: LoggerService,
      useFactory: () => {
        return {
          log: jest.fn(),
          error: jest.fn(),
        };
      },
    },
  ],
});
```

## Use Cases

### Mocking Platform Services

Platform providers are injected at the platform level, before TestBed is configured. This is useful for:

- Mocking services that need to be available platform-wide
- Overriding services that cannot be mocked via `TestBed.configureTestingModule`
- Providing test-specific implementations of platform services

### Testing with Custom Platform Configuration

```typescript
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { PLATFORM_ID } from '@angular/core';

setupZoneTestEnv({
  extraProviders: [
    {
      provide: PLATFORM_ID,
      useValue: 'server', // Test server-side rendering scenarios
    },
  ],
});
```

## Benefits

1. **More Flexible Configuration**: Mock platform services that cannot be configured via TestBed
2. **Cleaner Test Setup**: Configure platform-level services once in setup file
3. **Better Test Isolation**: Ensure platform services are properly mocked for all tests
4. **Easier Testing**: Simplify testing of components that depend on platform services
