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

#### Returns

An object contains Jest config:

```ts
type CjsPresetTransformerOptions = {
  tsconfig: string;
  stringifyContentPathRegex: string;
};

type CjsPresetType = {
  testEnvironment: string;
  moduleFileExtensions: Array<string>;
  snapshotSerializers: Array<string>;
  transformIgnorePatterns: Array<string>;
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': ['jest-preset-angular', CjsPresetTransformerOptions];
  };
};
```

#### Example:

```ts title="jest.config.ts"
import presets from 'jest-preset-angular/presets';
import type { Config } from 'jest';

const presetConfig = presets.createCjsPreset({
  //...options
});

const jestConfig: Config = {
  ...presetConfig,
};

export default jestConfig;
```

### `createEsmPreset(options)`

Create a configuration to process JavaScript/TypeScript/HTML/SVG files (`ts|js|html|svg`).

#### Parameters

- `options` (**OPTIONAL**)
  - `tsconfig`: see more at [tsconfig options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig)
  - `isolatedModules`: see more at [isolatedModules options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules)
  - `astTransformers`: see more at [astTransformers options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/astTransformers)
  - `diagnostics`: see more at [diagnostics options page](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/diagnostics)

#### Returns

An object contains Jest config:

```ts
type EsmPresetTransformerOptions = {
  tsconfig: string;
  stringifyContentPathRegex: string;
  useEsm: true;
};

type EsmPresetType = {
  testEnvironment: string;
  moduleFileExtensions: Array<string>;
  snapshotSerializers: Array<string>;
  extensionsToTreatAsEsm: Array;
  transformIgnorePatterns: Array<string>;
  transform: {
    '^.+\\.(ts|js|html|svg)$': ['jest-preset-angular', EsmPresetTransformerOptions];
  };
};
```

#### Example:

```ts title="jest.config.mts"
import presets from 'jest-preset-angular/presets';
import type { Config } from 'jest';

const presetConfig = presets.createEsmPreset({
  //...options
});

const jestConfig: Config = {
  ...presetConfig,
};

export default jestConfig;
```

### Legacy presets

:::warning

`jest-preset-angular` **DON'T RECOMMEND** to use legacy presets because this approach is not flexible to configure Jest configuration.
These legacy presets will be removed in the next major release and users are **HIGHLY RECOMMENDED** to migrate to use the above utility functions.

:::

| Preset name                                                        | Description                                                                                                                       |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `jest-preset-angular/presets/default`<br/>or `jest-preset-angular` | TypeScript, JavaScript and HTML files (`js`, `.ts`, `.html`) will be transformed by `jest-preset-angular` to **CommonJS** syntax. |
| `jest-preset-angular/presets/defaults-esm`<br/>                    | TypeScript, JavaScript and HTML files (`js`, `.ts`, `.html`) will be transformed by `jest-preset-angular` to **ESM** syntax.      |

#### Example

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
};

export default jestConfig;
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular/presets/defaults-esm',
};

export default jestConfig;
```
