---
id: jsdom-version
title: JSDOM version
---

`jest-preset-angular` provides a way to configure a different version of `JSDOM` than the one ships with `Jest`
via a custom `JSDOM` environment. One can follow the below steps to configure a different JSDOM version:

- Install the desired JSDOM version

```bash npm2yarn
npm install -D jsdom@<desired-version>
```

- In Jest config, set the `testEnvironment` like following

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

const jestConfig: Config = {
  testEnvironment: 'jest-preset-angular/environments/jsdom',
};

export default jestConfig;
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';

const jestConfig: Config = {
  testEnvironment: 'jest-preset-angular/environments/jsdom',
};

export default jestConfig;
```
