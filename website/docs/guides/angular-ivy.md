---
id: angular-ivy
title: Angular Ivy
---

Starting from **v9.0.0+**, `jest-preset-angular` is fully compatible with Angular Ivy. To make sure that Jest uses the
Angular Ivy, you must run `ngcc` before running tests. `ngcc` will transform all Angular-format packages to be compatible
with Ivy compiler.

`jest-preset-angular` also provides a Jest global setup file to help you to run `ngcc` with Jest. Add to the following section:

- to your root `jest.config.js`

```js
// jest.config.js
module.exports = {
  // [...]
  globalSetup: 'jest-preset-angular/global-setup',
};
```

- or to your root `package.json`

```json
{
  "jest": {
    "globalSetup": "jest-preset-angular/global-setup"
  }
}
```

Since **v12.0.0**, `jest-preset-angular` has some own config options under `ngJest` option in Jest `globals` config. One of those allows to skip `ngcc` processing.

To skip `ngcc` which runs by `jest-preset-angular/global-setup`, one can do the following

- in the `jest.config.js` where one is using `jest-preset-angular/global-setup`

```js
// jest.config.js
module.exports = {
  // [...]
  globalSetup: 'jest-preset-angular/global-setup',
  globals: {
    ngJest: {
      skipNgcc: true,
    },
  },
};
```

- or in the `package.json` where one is using `jest-preset-angular/global-setup`

```json
{
  "jest": {
    "globalSetup": "jest-preset-angular/global-setup",
    "globals": {
      "ngJest": {
        "skipNgcc": true
      }
    }
  }
}
```
