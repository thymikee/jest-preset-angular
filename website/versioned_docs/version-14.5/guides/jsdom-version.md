---
id: jsdom-version
title: JSDOM version
---

:::warning DEPRECATED

This page is now **DEPRECATED** and will be removed in the next major release. Please visit [JSDOM environment configuration](jsdom-environment.md)

:::

`jest-preset-angular` provides a way to configure a different version of `JSDOM` than the one ships with `Jest`
via a custom `JSDOM` environment. One can follow the below steps to configure a different JSDOM version:

- Install the desired JSDOM version

```bash npm2yarn
npm install -D jsdom@<desired-version>
```

- In Jest config, set the `testEnvironment` like following

```ts title="jest.config.ts"
import type { Config } from 'jest';

export default {
  testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
} satisfies Config;
```
