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

- Upgrade the project to **Angular 13** following [guide](https://angular.dev/update-guide/)

- If one is using the default preset as following:

```ts title="jest.config.ts"
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset(),
} satisfies Config;
```

there are no migration steps required

### Using ES Modules

ES Modules support is new and may encounter issues. See [example-apps](https://github.com/thymikee/jest-preset-angular/tree/main/examples) for the tests that run using ESM mode.

```ts title="jest.config.ts"
import type { Config } from 'jest';
import { createEsmPreset } from 'jest-preset-angular/presets';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  ...createEsmPreset(),
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig-esm.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        isolatedModules: true,
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    tslib: 'tslib/tslib.es6.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
```

Before upgrading to ng13 and switching to ES Modules, your `setup-jest.ts` file most likely uses the preset `setup-jest`, like the following:

```ts title="setup-jest.ts" tab={"label":"Setup file CJS"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();
```

```ts title="setup-jest.ts" tab={"label":"Setup file ESM"}
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

setupZoneTestEnv();
```

## Potential issues with Angular 13 ESM package format and workaround

### `Cannot find modules` error when importing any deep paths from Angular ESM format packages

```
Cannot find module '@angular/common/locales/xx' from 'src/app/app.component.spec.ts'
```

To fix this issue, one needs to add `mjs` to `moduleFileExtensions` as following

```ts title="jest.config.ts"
import type { Config } from 'jest';

export default {
  // ...other options
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
} satisfies Config;
```

### Usage with Angular libraries which are built with Angular CLI 13

Besides, the changes in Angular packages themselves, **Angular** libraries which are built with **Angular CLI 13** also introduce
ESM package format. Similar to Angular packages, Jest doesn't understand `.mjs` files which are in these new format
libraries in Jest **CommonJS** mode.

To fix this issue, one should modify `transformIgnorePatterns` to be as following:

```ts title="jest.config.ts"
import type { Config } from 'jest';

export default {
  // ...other options
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))'],
} satisfies Config;
```

### Usage with Ionic 6 or 7

To support Ionic 6 or 7 you will need to modify `transformIgnorePatterns` to be as following:

```ts title="jest.config.ts"
import type { Config } from 'jest';

export default {
  // ...other options
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@ionic/core|@ionic/angular|@stencil/core|.*\\.mjs|@angular/common/locales/.*\\.js$))',
  ],
} satisfies Config;
```
