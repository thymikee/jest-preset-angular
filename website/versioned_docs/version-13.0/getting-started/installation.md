---
id: installation
title: Installation
---

### Dependencies

You can install `jest-preset-angular` and dependencies all at once with one of the following commands.

#### NPM

```sh
npm install -D jest jest-preset-angular @types/jest
```

#### Yarn

```sh
yarn add -D jest jest-preset-angular @types/jest
```

### Configuration

:::important

Angular doesn't support native `async/await` in testing with `target` higher than `ES2016`, see https://github.com/angular/components/issues/21632#issuecomment-764975917

:::

In your project root, create `setup-jest.ts` file with following contents:

```ts
import 'jest-preset-angular/setup-jest';
```

Add the following section:

- to your root `jest.config.js`

```js tab
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
```

```ts tab
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default jestConfig;
```

```JSON tab
{
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": ["<rootDir>/setup-jest.ts"]
  }
}
```

Adjust your `tsconfig.spec.json` to be:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "module": "CommonJs",
    "types": ["jest"]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

Adjust `scripts` part your `package.json` to use `jest` instead of `ng`, e.g.

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### Customizing

#### Global mocks

`jest-preset-angular` uses `JSDOM` which is different from normal browsers. You might need some global browser mocks to
simulate the behaviors of real browsers in `JSDOM`. To add global mocks, you can do the following:

- Create a file `jest-global-mocks.ts` to your root project.
- Import it in your global setup file:

```ts
// Assuming that your global setup file is setup-jest.ts
import 'jest-preset-angular/setup-jest';
import './jest-global-mocks';
```

:::tip

An example for `jest-global-mocks.ts`

```
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
