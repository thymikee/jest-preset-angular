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

:::

```ts title="jest.config.ts"
import type { Config } from 'jest';

export default {
  //...
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
} satisfies Config;
```

### Processing with esbuild

Since **v11.0.0**, `jest-preset-angular` introduced the usage of `esbuild` to process files besides TypeScript API. By default, all `.mjs` files
will be processed by `esbuild` in `jest-preset-angular`. To configure extra files to process with `esbuild`, one can do the following:

```ts title="jest.config.ts"
import type { Config } from 'jest';

export default {
  //...
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        processWithEsbuild: [<glob_to_files>]
      }
    ]
  }
} satisfies Config;
```

### Exposed configuration

```ts
import type { Config } from 'jest';

export default {
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/html-comment',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/no-ng-attributes',
  ],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
} satisfies Config;
```

:::important

Jest runs with `jest-preset-angular` neither in browser nor through dev server. It uses `JSDOM` to abstract browser environment hence we depend on
`JSDOM` implementation for real browser features.

:::

### Brief explanation of config

- We're using `"transform"` to pass information about configuration to use for code compilation with `ts-jest`.
- `"moduleFileExtensions"` – our modules are TypeScript (`ts`), HTML (`html`), JavaScript (`js`), JSON (`json`) and ESM JavaScript (`mjs`) files.
- `"moduleNameMapper"` – if you're using absolute imports here's how to tell Jest where to look for them; uses `RegExp`.
- `"snapshotSerializers"` - array of serializers which will be applied to snapshot the code. See more in [Snapshot testing](../guides/snapshot-testing.md)
- `"testEnvironment"` – the test environment to run on.
- `"transformIgnorePatterns"`: instruct Jest to transform any `.mjs` files which come from `node_modules`.
- `"transform"` – run every `TS`, `JS`, `MJS`, `HTML`, or `SVG` file through so called _Jest transformer_; this lets Jest understand non-JS syntax.
