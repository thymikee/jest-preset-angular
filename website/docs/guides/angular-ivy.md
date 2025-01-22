---
id: angular-ivy
title: Angular Ivy
---

:::warning DEPRECATED

This guide is now **DEPRECATED** and will be removed in the next major release together with the below APIs.

:::

Starting from **v9.0.0+**, `jest-preset-angular` is fully compatible with Angular Ivy. To make sure that Jest uses the
Angular Ivy, you must run `ngcc` before running tests. `ngcc` will transform all Angular-format packages to be compatible
with Ivy compiler.

`jest-preset-angular` also provides a Jest global setup file to help you to run `ngcc` with Jest. Add to the following section:

- to your root Jest config

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

export default {
  //...
  globalSetup: 'jest-preset-angular/global-setup',
} satisfies Config;
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';

export default {
  //...
  globalSetup: 'jest-preset-angular/global-setup',
} satisfies Config;
```

## Control ngcc processing

Since **v12.0.0**, `jest-preset-angular` provide a possibility to skip `ngcc` via `globalThis` by doing the following

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
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

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';

globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json', // this is the project root tsconfig
};

export default {
  //...
  globalSetup: 'jest-preset-angular/global-setup',
} satisfies Config;
```
