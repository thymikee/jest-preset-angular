---
id: esm-support
title: ESM Support
---

To use `jest-preset-angular` with ESM support, you'll first need to check [ESM Jest documentation](https://jestjs.io/docs/en/ecmascript-modules).

`jest-preset-angular` supports ESM via a `ts-jest` config option [useESM](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/useESM) in combination with jest config option [extensionsToTreatAsEsm](https://jestjs.io/docs/en/configuration#extensionstotreatasesm-arraystring).

There is also a [preset](../getting-started/presets.md) to work with ESM.

:::tip

We have [example apps](https://github.com/thymikee/jest-preset-angular/tree/main/examples) which contains base ESM setup to work with Jest and Angular.

:::

Besides, there is utility function to ensure that Jest can set up test environment properly.

```ts title="setup-jest.ts"
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

setupZoneTestEnv();
```

### Examples

#### Manual configuration

```ts title="jest.config.mts"
import type { Config } from 'jest';

export default {
  //...
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        useESM: true,
      },
    ],
  },
} satisfies Config;
```

#### Use ESM presets

:::tip

Jest will attempt to load **ESM** files from `node_modules` with default `jest-resolve` which usually works for most of the cases.
However, there are cases like Angular libraries **ESM** built files or **ESM** files which are outside `node_modules` might not be loaded
correctly.

To fix that, one can use `moduleNameMapper` in jest config to instruct Jest to load the correct **ESM** files or create a
custom Jest [resolver](https://jestjs.io/docs/configuration#resolver-string).

:::

```ts title="jest.config.mts"
import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

export default {
  //...
  ...presets.createEsmPreset(),
} satisfies Config;
```
