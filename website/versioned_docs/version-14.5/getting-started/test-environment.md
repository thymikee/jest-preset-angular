---
id: test-environment
title: Test environment
---

:::warning DEPRECATED

This page is now **DEPRECATED** and will be removed in the next major release. Please visit [TestBed environment configuration](testbed-environment.md)

:::

In Jest, a test environment defines the sandbox context in which your tests run.
For Angular projects, setting up the correct test environment is essential to ensure compatibility with the
framework-specific features, such as dependency injection and change detection.

`jest-preset-angular` provides utility functions to simplify setting up a Jest test environment tailored for Angular projects.
These functions support both **zone-based** and **zoneless** environments, catering to different testing needs.

## Functions

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc.slice(1)} />

---

### `setupZoneTestEnv(options)`

Configures a test environment that uses `zone.js`, which is the mechanism for tracking asynchronous operations.
It is suitable for most Angular applications that rely on `zone.js` for change detection and other framework features.

You can customize the environment by providing options as function arguments.

#### Parameters

- `options`**(optional)**: An object follows [TestEnvironmentOptions interface](https://github.com/angular/angular/blob/a55341b1ab8d2bc4285a4cce59df7fc0b23c0125/packages/core/testing/src/test_bed_common.ts#L95), which allows fine-tuning the environment.

#### Example:

- Create a Jest setup file:

```ts title="setup-jest.ts" tab={"label": "TypeScript CJS"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  //...options
});
```

```ts title="setup-jest.ts" tab={"label": "TypeScript ESM"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

setupZoneTestEnv({
  //...options
});
```

- Update your Jest configuration:

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

export default {
  ...presets.createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

export default {
  ...presets.createEsmPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```

### `setupZonelessTestEnv(options)`

Configures a test environment that **DOESN'T** use `zone.js`, as described in [Angular experimental zoneless guide](https://angular.dev/guide/experimental/zoneless).
It is designed for projects that have disabled `zone.js`, which can lead to improved performance and simplified testing.

You can customize the environment by providing options as function arguments.

#### Parameters

- `options`**(optional)**: An object follows [TestEnvironmentOptions interface](https://github.com/angular/angular/blob/a55341b1ab8d2bc4285a4cce59df7fc0b23c0125/packages/core/testing/src/test_bed_common.ts#L95), which allows fine-tuning the environment.

#### Example:

- Create a Jest setup file:

```ts title="setup-jest.ts" tab={"label": "TypeScript CJS"}
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv({
  //...options
});
```

```ts title="setup-jest.ts" tab={"label": "TypeScript ESM"}
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless/index.mjs';

setupZonelessTestEnv({
  //...options
});
```

- Update your Jest configuration:

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

export default {
  ...presets.createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

export default {
  ...presets.createEsmPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```
