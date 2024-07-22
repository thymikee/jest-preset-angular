---
id: jsdom-version
title: Configure other JSDOM versions
---

**Jest** v26+ by default uses **JSDOM** 16 to support Node 10+.

If you need a different JSDOM version than the one that ships with Jest, you can install a jsdom environment
package, e.g. `jest-environment-jsdom-sixteen` and edit your Jest config like so:

```js tab
// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom-sixteen',
};
```

```ts tab
// jest.config.ts
import type { Config } from 'jest';

const jestConfig: Config = {
  testEnvironment: 'jest-environment-jsdom-sixteen',
};

export default jestConfig;
```

If you use JSDOM v11 or lower, you might have to mock `localStorage` or `sessionStorage` on your own or using some third-party library by loading it in `setupFilesAfterEnv`.

Reference: https://jestjs.io/docs/en/configuration.html#testenvironment-string, https://github.com/jsdom/jsdom/blob/main/Changelog.md#1200
