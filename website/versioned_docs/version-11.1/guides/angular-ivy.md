---
id: angular-ivy
title: Angular Ivy
---

Starting from **v9.0.0+**, `jest-preset-angular` is fully compatible with Angular Ivy. To make sure that Jest uses the
Angular Ivy, you must run `ngcc` before running tests. `ngcc` will transform all Angular-format packages to be compatible
with Ivy compiler.

`jest-preset-angular` also provides a Jest `global-setup.js` file to help you to run `ngcc` with Jest. Add to the following section:

- to your root Jest config

```js tab
// jest.config.js
module.exports = {
  // [...]
  globalSetup: 'jest-preset-angular/global-setup',
};
```

```ts tab
// jest.config.ts
import type { Config } from 'jest-config';

const jestConfig: Config = {
  // [...]
  globalSetup: 'jest-preset-angular/global-setup',
};

export default jestConfig;
```
