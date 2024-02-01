---
id: angular-13+
title: Angular >=13
---

**Angular 13** introduces ESM package format for Angular packages. `jest-preset-angular`
currently supports testing with Jest in `CommonJS` mode with **Angular 13** using [default preset](../getting-started/presets.md).

:::important

With Jest 28 and `jest-preset-angular` **v12.0.0**, `ng-jest-resolver` is no longer required to have in Jest config. This
resolver is also excluded from our default and default ESM presets.

:::

Starting from **v11.0.0**, `jest-preset-angular` introduces a few extra changes to be able to run Jest with **Angular 13**:

- `moduleFileExtensions` is updated to include `mjs` files as accepted module format.

- `transformIgnorePatterns` is added to inform Jest to transform `.mjs` files.

- `transform` is updated to include `.mjs` extension to transform to `CommonJS` codes.

## Migration steps from Angular < 13

- Upgrade the project to **Angular 13** following [guide](https://update.angular.io/)

- If one is using the default preset as following:

```js tab
module.exports = {
  preset: 'jest-preset-angular',
};
```

```ts tab
import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
};

export default jestConfig;
```

there are no migration steps required

### Using ES Modules

ES Modules support is new and may encounter issues. See [example-app-v13](https://github.com/thymikee/jest-preset-angular/tree/main/examples/example-app-v13) for an example with tests that run using ESM, and using ESM + isolated.

Your `jest.config.js` should be changed to something like:

```js tab
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { paths } = require('./tsconfig.json').compilerOptions;

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'jest-preset-angular/presets/defaults-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
    },
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
    tslib: 'tslib/tslib.es6.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
```

```ts tab
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: Config = {
  preset: 'jest-preset-angular/presets/defaults-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
    },
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    tslib: 'tslib/tslib.es6.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default jestConfig;
```

Before upgrading to ng13 and switching to ES Modules, your `setup-jest.ts` file most likely uses the preset `setup-jest`, like the following:

```ts
// setup-jest.ts
import 'jest-preset-angular/setup-jest';
```

or for ESM mode

```ts
// setup-jest.ts
import 'jest-preset-angular/setup-jest.mjs';
```

## Potential issues with Angular 13 ESM package format and workaround

### `Cannot find modules` error when importing any deep paths from Angular ESM format packages

```
Cannot find module '@angular/common/locales/xx' from 'src/app/app.component.spec.ts'
```

To fix this issue, one needs to add `mjs` to `moduleFileExtensions` as following

```js tab
module.exports = {
  // ...other options
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
};
```

```ts tab
import type { Config } from 'jest';

const jestConfig: Config = {
  // ...other options
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
};

export default jestConfig;
```

### Usage with Angular libraries which are built with Angular CLI 13

Besides, the changes in Angular packages themselves, **Angular** libraries which are built with **Angular CLI 13** also introduce
ESM package format. Similar to Angular packages, Jest doesn't understand `.mjs` files which are in these new format
libraries in Jest **CommonJS** mode.

To fix this issue, one should modify `transformIgnorePatterns` to be as following:

```js tab
module.exports = {
  // ...other options
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
```

```ts tab
import type { Config } from 'jest';

const jestConfig: Config = {
  // ...other options
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};

export default jestConfig;
```
