---
id: installation
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Dependencies

You can install `jest-preset-angular` and dependencies all at once with one of the following commands.

```bash npm2yarn
npm install -D jest jest-preset-angular @types/jest
```

### Configuration

:::important

Angular doesn't support native `async/await` in testing with `target` higher than `ES2016`, see https://github.com/angular/components/issues/21632#issuecomment-764975917

:::

:::tip

For ESM configuration, please see more in details with [ESM guide](../guides/esm-support).

:::

In your project root, create a setup file with following contents:

```ts title="setup-jest.ts" tab={"label":"Setup file CJS"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();
```

```ts title="setup-jest.ts" tab={"label":"Setup file ESM"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

setupZoneTestEnv();
```

Add the following section to your root Jest config

```ts title="jest.config.ts" tab={"label":"Jest config CJS"}
import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

export default {
  ...presets.createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```

```ts title="jest.config.ts" tab={"label":"Jest config ESM"}
import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

export default {
  ...presets.createEsmPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```

Adjust your `tsconfig.spec.json` to be:

```json5 title="tsconfig.spec.json" tab={"label": "Tsconfig CJS"}
{
  //...
  extends: './tsconfig.json',
  compilerOptions: {
    //...
    module: 'CommonJS',
    types: ['jest'],
  },
  include: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
  //...
}
```

```json title="tsconfig.spec.json" tab={"label": "Tsconfig ESM"}
{
  //...
  "extends": "./tsconfig.json",
  "compilerOptions": {
    //...
    "module": "ES2022",
    "types": ["jest"]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
  //...
}
```

Adjust `scripts` part your `package.json` to use `jest` instead of `ng`, e.g.

```json title="package.json" tab={"label": "package.json for CJS"}
{
  //...
  "scripts": {
    "test": "jest"
  }
  //...
}
```

```json title="package.json" tab={"label": "package.json for ESM"}
{
  //...
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  }
  //...
}
```

### Customizing

#### Global mocks

`jest-preset-angular` uses `JSDOM` which is different from normal browsers. You might need some global browser mocks to
simulate the behaviors of real browsers in `JSDOM`. To add global mocks, you can do the following:

- Create a file `jest-global-mocks.ts` to your root project.
- Import it in your global setup file:

```ts title="setup-jest.ts" tab={"label":"Setup file CJS"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import './jest-global-mocks';

setupZoneTestEnv();
```

```ts title="setup-jest.ts" tab={"label":"Setup file ESM"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';
import './jest-global-mocks';

setupZoneTestEnv();
```

:::tip

An example for `jest-global-mocks.ts`

```ts title="jest-global-mocks.ts"
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
```

:::

#### Avoid karma conflicts

By Angular CLI defaults you'll have a `src/test.ts` file which will be picked up by jest. To circumvent this you can either rename it to `src/karmaTest.ts` or hide it from jest by adding `<rootDir>/src/test.ts` to jest `testPathIgnorePatterns` option.
