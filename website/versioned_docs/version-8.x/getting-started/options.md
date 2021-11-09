---
id: options
title: Options
---

`jest-preset-angular` uses `ts-jest` options under the hood, which are located under the `globals` of Jest config object
in the `package.json` file of your project, or through a `jest.config.js`, or `jest.config.ts` file.

More information about `ts-jest` options, see https://kulshekhar.github.io/ts-jest/docs/next/getting-started/options

### Exposed configuration

```js
module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer',
        ],
      },
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/html-comment',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/no-ng-attributes',
  ],
};
```

:::important

Jest doesn't run in browser nor through dev server. It uses `JSDOM` to abstract browser environment. So we have to cheat
a little and inline our templates and get rid of styles (**we're not testing CSS**) because otherwise Angular will try
to make `XHR` call for our templates and fail miserably.

:::

### Brief explanation of config

- we're using some `"globals"` to pass information about where our tsconfig.json file is that we'd like to be able to transform HTML files through `ts-jest`.
- `"transform"` – run every TS, JS, or HTML file through so called _Jest transformer_; this lets Jest understand non-JS syntax.
- `"moduleFileExtensions"` – our modules are TypeScript (`ts`), HTML (`html`), JavaScript (`js`) and JSON (`json`) files.
- `"moduleNameMapper"` – if you're using absolute imports here's how to tell Jest where to look for them; uses regex.
- `"transformIgnorePatterns"` – unfortunately some modules (like @ngrx) are released as TypeScript files, not pure JavaScript;
  in such cases we cannot ignore them (all node_modules are ignored by default), so they can be transformed through TS compiler
  like any other module in our project.
- `"snapshotSerializers"` - array of serializers which will be applied to snapshot the code. Note: by default angular adds
  some angular-specific attributes to the code (like `ng-reflect-*`, `ng-version="*"`, `_ngcontent-c*` etc).
  This package provides serializer to remove such attributes. This makes snapshots cleaner and more human-readable.
  To remove such specific attributes use `no-ng-attributes` serializer. You need to add `no-ng-attributes` serializer manually.
