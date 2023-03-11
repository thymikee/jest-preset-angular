---
id: angular-ivy
title: Angular Ivy
---

Starting from **v9.0.0+**, `jest-preset-angular` is fully compatible with Angular Ivy. To make sure that Jest uses the
Angular Ivy, you must run `ngcc` before running tests. `ngcc` will transform all Angular-format packages to be compatible
with Ivy compiler.

`jest-preset-angular` also provides a Jest global setup file to help you to run `ngcc` with Jest. Add to the following section:

- to your root `jest.config.js`

```js tab
module.exports = {
  //...
  globalSetup: 'jest-preset-angular/global-setup',
};
```

```ts tab
import type { Config } from 'jest';

const jestConfig: Config = {
  //...
  globalSetup: 'jest-preset-angular/global-setup',
};

export default jestConfig;
```

```JSON tab
{
  "jest": {
    "globalSetup": "jest-preset-angular/global-setup"
  }
}
```

## Control ngcc processing

Since **v12.0.0**, `jest-preset-angular` provide a possibility to skip `ngcc` via `globalThis` by doing the following

```js tab
globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json', // this is the project root tsconfig
};

module.exports = {
  //...
  globalSetup: 'jest-preset-angular/global-setup',
};
```

```ts tab
import type { Config } from 'jest';

globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json', // this is the project root tsconfig
};

const jestConfig: Config = {
  //...
  globalSetup: 'jest-preset-angular/global-setup',
};

export default jestConfig;
```
