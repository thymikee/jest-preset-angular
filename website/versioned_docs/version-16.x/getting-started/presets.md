---
id: presets
title: Presets
---

In Jest, **presets** are pre-defined configurations that help streamline and standardize the process of setting up testing environments.
They allow developers to quickly configure Jest with specific transformers, file extensions, and other options.

`jest-preset-angular` provides very opinionated presets and based on what we found to be useful.

:::important

The current best practice for using presets is to call one of the utility functions below to create (and optionally extend) presets. Legacy presets are listed at the bottom of the page.

:::

## Functions

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc.slice(1)} />

---

### `createCjsPreset(options)`

Create a configuration to process JavaScript/TypeScript/HTML/SVG files (`ts|js|mjs|html|svg`).

#### Parameters

- `options` (**OPTIONAL**)
  - `tsconfig`: see more at [tsconfig options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig)
  - `isolatedModules`: see more at [isolatedModules options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules)
  - `astTransformers`: see more at [astTransformers options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/astTransformers)
  - `diagnostics`: see more at [diagnostics options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/diagnostics)
  - `testEnvironment`: either `jsdom` or `jest-preset-angular/environments/jest-jsdom-env`. Defaults to `jsdom`.

#### Default returned value

An object contains Jest config:

```json
{
  "moduleFileExtensions": ["ts", "html", "js", "json", "mjs"],
  "snapshotSerializers": [
    "jest-preset-angular/build/serializers/html-comment",
    "jest-preset-angular/build/serializers/ng-snapshot",
    "jest-preset-angular/build/serializers/no-ng-attributes"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(ts|js|mjs|html|svg)$": [
      "jest-preset-angular",
      {
        "stringifyContentPathRegex": "\\.(html|svg)$",
        "tsconfig": "<rootDir>/tsconfig.spec.json"
      }
    ]
  },
  "transformIgnorePatterns": ["node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))"]
}
```

#### Example:

```ts title="jest.config.ts" tab={"label":"Node <22.18"}
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

const presetConfig = createCjsPreset({
  //...options
});

export default {
  ...presetConfig,
} satisfies Config;
```

```ts title="jest.config.ts" tab={"label":"Node 22.18+"}
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets/index.js';

const presetConfig = createCjsPreset({
  //...options
});

export default {
  ...presetConfig,
} satisfies Config;
```

### `createEsmPreset(options)`

Create a configuration to process JavaScript/TypeScript/HTML/SVG files (`ts|js|html|svg`).

#### Parameters

- `options` (**OPTIONAL**)
  - `tsconfig`: see more at [tsconfig options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig)
  - `isolatedModules`: see more at [isolatedModules options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules)
  - `astTransformers`: see more at [astTransformers options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/astTransformers)
  - `diagnostics`: see more at [diagnostics options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/diagnostics)
  - `testEnvironment`: either `jsdom` or `jest-preset-angular/environments/jest-jsdom-env`. Defaults to `jsdom`.

#### Default returned value

An object contains Jest config:

```json
{
  "extensionsToTreatAsEsm": [".ts"],
  "moduleFileExtensions": ["ts", "html", "js", "json", "mjs"],
  "moduleNameMapper": {
    "tslib": "tslib/tslib.es6.js"
  },
  "snapshotSerializers": [
    "jest-preset-angular/build/serializers/html-comment",
    "jest-preset-angular/build/serializers/ng-snapshot",
    "jest-preset-angular/build/serializers/no-ng-attributes"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(ts|js|html|svg)$": [
      "jest-preset-angular",
      {
        "stringifyContentPathRegex": "\\.(html|svg)$",
        "tsconfig": "<rootDir>/tsconfig.spec.json",
        "useESM": true
      }
    ]
  },
  "transformIgnorePatterns": ["node_modules/(?!tslib)"]
}
```

#### Example:

```ts title="jest.config.ts" tab={"label":"Node <22.18"}
import type { Config } from 'jest';
import { createEsmPreset } from 'jest-preset-angular/presets';

const presetConfig = createEsmPreset({
  //...options
});

export default {
  ...presetConfig,
} satisfies Config;
```

```ts title="jest.config.ts" tab={"label":"Node 22.18+"}
import type { Config } from 'jest';
import { createEsmPreset } from 'jest-preset-angular/presets/index.js';

const presetConfig = createEsmPreset({
  //...options
});

export default {
  ...presetConfig,
} satisfies Config;
```
