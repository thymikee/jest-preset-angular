---
id: testbed-environment
title: TestBed environment
---

Angular provides a powerful testing utility called [TestBed](https://angular.dev/api/core/testing/TestBed),
which allows to configure and initialize an environment for unit testing and provides methods for creating components and services in unit tests.

`jest-preset-angular` provides utility functions to simplify setting up `TestBed` environment. These below utility functions
support both **zone-based** and **zoneless** environments, catering to different testing needs.

## Functions

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc.slice(1)} />

---

### `setupZoneTestEnv(options)`

Configures an environment that uses `zone.js`, which is the mechanism for tracking asynchronous operations.
It is suitable for most Angular applications that rely on `zone.js` for change detection and other framework features.

You can customize the environment by providing options as function arguments.

#### Parameters

- `options`**(optional)**: An object follows [TestEnvironmentOptions interface](https://github.com/angular/angular/blob/a55341b1ab8d2bc4285a4cce59df7fc0b23c0125/packages/core/testing/src/test_bed_common.ts#L95), which allows fine-tuning the environment.

#### Example:

- Create a Jest setup file:

```ts title="setup-jest.ts" tab={"label": "Setup file CJS"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  //...options
});
```

```ts title="setup-jest.ts" tab={"label": "Setup file ESM"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

setupZoneTestEnv({
  //...options
});
```

- Update your Jest configuration:

```ts title="jest.config.ts" tab={"label":"Node <22.18"}
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```

```ts title="jest.config.ts" tab={"label":"Node 22.18+"}
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets/index.js';

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```

### `setupZonelessTestEnv(options)`

Configures an environment that **DOESN'T** use `zone.js`, as described in [Angular experimental zoneless guide](https://angular.dev/guide/experimental/zoneless).
It is designed for projects that have disabled `zone.js`, which can lead to improved performance and simplified testing.

You can customize the environment by providing options as function arguments.

#### Parameters

- `options`**(optional)**: An object follows [TestEnvironmentOptions interface](https://github.com/angular/angular/blob/a55341b1ab8d2bc4285a4cce59df7fc0b23c0125/packages/core/testing/src/test_bed_common.ts#L95), which allows fine-tuning the environment.

#### Example:

- Create a Jest setup file:

```ts title="setup-jest.ts" tab={"label": "Setup file CJS"}
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv({
  //...options
});
```

```ts title="setup-jest.ts" tab={"label": "Setup file ESM"}
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless/index.mjs';

setupZonelessTestEnv({
  //...options
});
```

- Update your Jest configuration:

```ts title="jest.config.ts" tab={"label":"Node <22.18"}
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```

```ts title="jest.config.ts" tab={"label":"Node 22.18+"}
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets/index.js';

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```
