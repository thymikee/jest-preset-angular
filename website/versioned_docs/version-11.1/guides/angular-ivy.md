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
  globalSetup: 'jest-preset-angular/globalSetup',
};
```

- or to your root `package.json`

```json
{
  "jest": {
    "globalSetup": "jest-preset-angular/globalSetup"
  }
}
```
