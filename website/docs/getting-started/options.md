---
id: options
title: Options
---

`jest-preset-angular` uses `ts-jest` options under the hood, which are located under the `transform` of Jest config object
in the `package.json` file of your project, or through a `jest.config.js`, or `jest.config.ts` file.

More information about `ts-jest` options, see [doc](https://kulshekhar.github.io/ts-jest/docs/getting-started/options)

:::important

Since **v9.0.0**, `jest-preset-angular` default Jest configuration no longer provides `moduleNameMapper`. If you wish to reuse
the old `moduleNameMapper` configuration, you can put this into your Jest config.

```js tab
// jest.config.js
module.exports = {
  //...
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
};
```

```ts tab
// jest.config.ts
import type { Config } from 'jest';

const jestConfig: Config = {
  //...
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
};

export default jestConfig;
```

### Processing with esbuild

Since **v11.0.0**, `jest-preset-angular` introduced the usage of `esbuild` to process files besides TypeScript API. By default, all `.mjs` files
will be processed by `esbuild` in `jest-preset-angular`. To configure extra files to process with `esbuild`, one can do the following:

```js tab
// jest.config.js
module.exports = {
  //...
  globals: {
    ngJest: {
      processWithEsbuild: [<glob_to_files>],
    },
  },
}
```

```ts tab
// jest.config.ts
import type { Config } from 'jest';

const jestConfig: Config = {
  //...
  globals: {
    ngJest: {
      processWithEsbuild: [<glob_to_files>],
    },
  },
}

export default jestConfig;
```

:::

### Exposed configuration

```js tab
// jest.config.js
const snapshotSerializers = require('../build/serializers');

module.exports = {
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  snapshotSerializers,
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
};
```

```ts tab
// jest.config.ts
import type { Config } from 'jest';
import snapshotSerializers from 'jest-preset-angular/build/serializers';

const jestConfig: Config = {
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  snapshotSerializers,
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
};

export default jestConfig;
```

:::important

Jest runs with `jest-preset-angular` neither in browser nor through dev server. It uses `JSDOM` to abstract browser environment hence we depend on
`JSDOM` implementation for real browser features.

:::

### Brief explanation of config

- We're using `"transform"` to pass information about configuration to use for code compilation with `ts-jest`.
- `"moduleFileExtensions"` – our modules are TypeScript (`ts`), HTML (`html`), JavaScript (`js`), JSON (`json`) and ESM JavaScript (`mjs`) files.
- `"moduleNameMapper"` – if you're using absolute imports here's how to tell Jest where to look for them; uses `RegExp`.
- `"resolver"` - instruct Jest how to resolve entry file based on `package.json` definitions.
- `"snapshotSerializers"` - array of serializers which will be applied to snapshot the code. Note: by default angular adds
  some angular-specific attributes to the code (like `ng-reflect-*`, `ng-version="*"`, `_ngcontent-c*` etc).
  This package provides serializer to remove such attributes. This makes snapshots cleaner and more human-readable.
  To remove such specific attributes use `no-ng-attributes` serializer. You need to add `no-ng-attributes` serializer manually.
- `"testEnvironment"` – the test environment to run on.
- `"transformIgnorePatterns"`: instruct Jest to transform any `.mjs` files which come from `node_modules`.
- `"transform"` – run every `TS`, `JS`, `MJS`, `HTML`, or `SVG` file through so called _Jest transformer_; this lets Jest understand non-JS syntax.
