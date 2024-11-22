---
id: test-environment
title: Test environment
---

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

```ts tab={"label": "TypeScript CJS"}
// setup-jest.ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  //...options
});
```

```ts tab={"label": "TypeScript ESM"}
// setup-jest.ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

setupZoneTestEnv({
  //...options
});
```

- Update your Jest configuration:

```ts tab={"label": "TypeScript CJS"}
// jest.config.ts
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default jestConfig;
```

```ts tab={"label": "TypeScript ESM"}
// jest.config.mts
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default jestConfig;
```

### `setupZonelessTestEnv(options)`

Configures a test environment that **DOESN'T** use `zone.js`, as described in [Angular experimental zoneless guide](https://angular.dev/guide/experimental/zoneless).
It is designed for projects that have disabled `zone.js`, which can lead to improved performance and simplified testing.

You can customize the environment by providing options as function arguments.

#### Parameters

- `options`**(optional)**: An object follows [TestEnvironmentOptions interface](https://github.com/angular/angular/blob/a55341b1ab8d2bc4285a4cce59df7fc0b23c0125/packages/core/testing/src/test_bed_common.ts#L95), which allows fine-tuning the environment.

#### Example:

- Create a Jest setup file:

```ts tab={"label": "TypeScript CJS"}
// setup-jest.ts
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv({
  //...options
});
```

```ts tab={"label": "TypeScript ESM"}
// setup-jest.ts
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless/index.mjs';

setupZonelessTestEnv({
  //...options
});
```

- Update your Jest configuration:

```ts tab={"label": "TypeScript CJS"}
// jest.config.mts
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default jestConfig;
```

```ts tab={"label": "TypeScript ESM"}
// jest.config.mts
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default jestConfig;
```
