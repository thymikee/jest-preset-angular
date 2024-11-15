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

In your project root, create a setup file with following contents:

```ts tab={"label":"TypeScript CJS"}
// setup-jest.ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();
```

```ts tab={"label":"TypeScript ESM"}
// setup-jest.ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

setupZoneTestEnv();
```

Add the following section to your root Jest config

```ts tab={"label":"TypeScript CJS"}
// jest.config.ts
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default jestConfig;
```

```ts tab={"label":"TypeScript ESM"}
// jest.config.mts
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default jestConfig;
```

Adjust your `tsconfig.spec.json` to be:

```json5 tab={"label": "Tsconfig CJS"}
// tsconfig.spec.json
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

```json tab={"label": "Tsconfig ESM"}
// tsconfig.spec.json
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

```json
// package.json
{
  //...
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
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

```ts tab={"label":"TypeScript CJS"}
// setup-jest.ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import './jest-global-mocks';

setupZoneTestEnv();
```

```ts tab={"label":"TypeScript ESM"}
// setup-jest.ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone.mjs';
import './jest-global-mocks';

setupZoneTestEnv();
```

:::tip

An example for `jest-global-mocks.ts`

```ts
// jest-global-mocks.ts
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
