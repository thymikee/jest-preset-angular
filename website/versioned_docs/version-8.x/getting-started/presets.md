---
id: presets
title: Presets
---

### The presets

`jest-preset-angular` comes with a preset, covering most of the project's base configuration:

| Preset name           | Description                                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `jest-preset-angular` | TypeScript, JavaScript and HTML files (`js`, `.ts`, `.html`) will be transformed by `ts-jest` to **CommonJS** syntax. |

### Basic usage

In most cases, simply setting the `preset` key to the desired preset name in your Jest config should be enough to start
using TypeScript with Jest (assuming you added `jest-preset-angular` to your `devDependencies` of course):

```js
// jest.config.js
module.exports = {
  // [...]
  preset: 'jest-preset-angular',
};
```

```json
// OR package.json
{
  // [...]
  "jest": {
    "preset": "jest-preset-angular"
  }
}
```

### Advanced

All presets come with default `ts-jest` config options.
If you want to override any of the options, you'll need to use the JavaScript version of Jest config,
copy the original options and override the options you need:

```js
// jest.config.js
const { defaults: tsjPreset } = require('jest-preset-angular');

module.exports = {
  // [...]
  globals: {
    'ts-jest': {
      ...tsjPreset.globals['ts-jest'],
      // [...your overriden options]
    },
  },
};
```

:::important

If you choose to override `globals` in order to point at a specific tsconfig, you will need to make sure that original `ts-jest`
options provided through the default preset are defined to the `globals.ts-jest` section too, otherwise you will get
errors.

:::
