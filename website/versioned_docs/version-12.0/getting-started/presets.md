---
id: presets
title: Presets
---

### The presets

`jest-preset-angular` comes with 2 presets, covering most of the project's base configuration:

| Preset name                                                        | Description                                                                                                                       |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `jest-preset-angular/presets/default`<br/>or `jest-preset-angular` | TypeScript, JavaScript and HTML files (`js`, `.ts`, `.html`) will be transformed by `jest-preset-angular` to **CommonJS** syntax. |
| `jest-preset-angular/presets/defaults-esm`<br/>                    | TypeScript, JavaScript and HTML files (`js`, `.ts`, `.html`) will be transformed by `jest-preset-angular` to **ESM** syntax.      |

### Basic usage

In most cases, simply setting the `preset` key to the desired preset name in your Jest config should be enough to start
using TypeScript with Jest (assuming you added `jest-preset-angular` to your `devDependencies` of course):

```js tab
module.exports = {
  // [...]
  // Replace `jest-preset-angular` with the preset you want to use
  // from the above list
  preset: 'jest-preset-angular',
};
```

```ts tab
import type { Config } from 'jest';

const jestConfig: Config = {
  // [...]
  // Replace `jest-preset-angular` with the preset you want to use
  // from the above list
  preset: 'jest-preset-angular',
};

export default jestConfig;
```

```JSON tab
{
  //...
  "jest": {
    // Replace `jest-preset-angular` with the preset you want to use
    // from the above list
    "preset": "jest-preset-angular"
  }
}
```

### Advanced

All presets come with default `ts-jest` config options.
If you want to override any of the options, you'll need to use the JavaScript version of Jest config,
copy the original options and override the options you need:

:::important

If you choose to override `globals` in order to point at a specific tsconfig, you will need to make sure that original `ts-jest`
options provided through the default preset are defined to the `globals.ts-jest` section too, otherwise you will get
errors.

:::

```js tab
const { defaults: jestNgPreset } = require('jest-preset-angular/presets');
// const { defaultsESM: jestNgPreset } = require('jest-preset-angular/presets')

module.exports = {
  // [...]
  globals: {
    'ts-jest': {
      ...jestNgPreset.globals['ts-jest'],
      // [...your overriden options]
    },
  },
};
```

```ts tab
import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

const jestConfig: Config = {
  // [...]
  globals: {
    'ts-jest': {
      ...presets.defaults.globals['ts-jest'],
      // [...your overriden options]
    },
  },
};

export default jestConfig;
```
