---
id: angular-ivy
title: Angular Ivy
---

Currently, `jest-preset-angular` is partially compatible with Angular Ivy. To make sure that Jest uses the Angular Ivy,
you must run `ngcc` before running tests. `ngcc` will transform all Angular-format packages to be compatible
with Ivy compiler.

`jest-preset-angular` also provides util script to help you to run `ngcc` with Jest but this script only works via the
JavaScript version of Jest config

```js
// jest.config.js
require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  // [...]
};
```
