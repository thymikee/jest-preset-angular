---
id: esm-support
title: ESM Support
---

To use `jest-preset-angular` with ESM support, you'll first need to check [ESM Jest documentation](https://jestjs.io/docs/en/ecmascript-modules).

`jest-preset-angular` supports ESM via a `ts-jest` config option [useESM](https://kulshekhar.github.io/ts-jest/docs/next/getting-started/options/useESM) in combination with jest config option [extensionsToTreatAsEsm](https://jestjs.io/docs/en/next/configuration#extensionstotreatasesm-arraystring).

There is also a preset(../getting-started/presets.md) to work with ESM.

### Examples

#### Manual configuration

```js
// jest.config.js
module.exports = {
  // [...]
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      useESM: true,
    },
  },
};
```

```json
// OR package.json
{
  // [...]
  "jest": {
    "extensionsToTreatAsEsm": [".ts"],
    "globals": {
      "ts-jest": {
        "tsconfig": "<rootDir>/tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.html$",
        "useESM": true
      }
    }
  }
}
```

#### Use ESM presets

```js
// jest.config.js
module.exports = {
  // [...]
  preset: 'jest-preset-angular/presets/default-esm',
};
```

```json
// OR package.json
{
  // [...]
  "jest": {
    "preset": "jest-preset-angular/presets/default-esm"
  }
}
```
