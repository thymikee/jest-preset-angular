---
id: esm-support
title: ESM Support
---

:::important

Jest will take into account of the following things when working with ESM:

- [ESM runtime](https://jestjs.io/docs/en/ecmascript-modules)
- The value of `module` option in tsconfig file is either:
  - `Node16/Node18/NodeNext`: this **MUST** go together with `type: "module"` in `package.json`.
  - Otherwise, the value **MUST BE** one of the ES values, e.g. `ES2015`, `ES2020` etc...

:::

One can configure `jest-preset-angular` to work with Jest in ESM mode by following the steps below.

:::tip

We have [**EXAMPLE APPS**](https://github.com/thymikee/jest-preset-angular/tree/main/examples) which contains base ESM setup to work with Jest and Angular.

:::

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc.slice(0)} />

---

## Configure Jest runtime

:::warning

Jest runtime currently has a few issues related to support ESM:

- Not taking into account of `type: "module"` field in `package.json` yet to run as ESM mode.
- Mocking ES modules are not supported yet, track progress here https://github.com/jestjs/jest/pull/10976

Overall progress and discussion can be found at https://github.com/jestjs/jest/issues/9430

:::

:::info

If one is using Jest config in TypeScript, one should install `ts-node` as a dev dependency.

```bash npm2yarn

npm install -D ts-node

```

:::

Execute Jest with with `--experimental-vm-modules` flag for `NodeJs`

```bash

node --experimental-vm-modules node_modules/jest/bin/jest.js

```

:::tip

Alternative way for `Yarn` users:

```bash

yarn node --experimental-vm-modules $(yarn bin jest)

```

This command will also work if you use `Yarn Plug'n'Play.`

:::

## Configure `tsconfig`

One can choose **EITHER ONE** of the following options for `tsconfig`:

### Using ES module values

```json title="tsconfig.spec.json"
{
  "compilerOptions": {
    "module": "ESNext", // or any values starting with "es" or "ES"
    "target": "ESNext",
    "esModuleInterop": true
  }
}
```

### Using hybrid module values

:::info

Hybrid module values requires `type` field in `package.json` to be set explicitly to:

- `commonjs` for `CommonJS` code
- `module` for `ESM` code

See official TypeScript documentation at https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-node18-nodenext

:::

:::important

Currently, the code transpiler which is used by `jest-preset-angular` **ONLY** supports hybrid values with `isolatedModules: true`

:::

```json title="tsconfig.spec.json"
{
  "compilerOptions": {
    "module": "Node16", // or Node18/NodeNext
    "target": "ESNext",
    "esModuleInterop": true,
    "isolatedModules": true
  }
}
```

## Configure Jest config

:::tip

Jest will attempt to load **ESM** files from `node_modules` with default `jest-resolve` which usually works for most of the cases.
However, there are cases like Angular libraries **ESM** built files or **ESM** files which are outside `node_modules` might not be loaded
correctly.

To fix that, one can use `moduleNameMapper` in jest config to instruct Jest to load the correct **ESM** files or create a
custom Jest [resolver](https://jestjs.io/docs/configuration#resolver-string).

:::

```ts title="jest.config.ts" tab={"label":"Node <22.18"}
import type { Config } from 'jest';
import { createEsmPreset } from 'jest-preset-angular/presets';

export default {
  //...
  ...createEsmPreset(),
  moduleNameMapper: {
    tslib: 'tslib/tslib.es6.js',
    '^rxjs': '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
  },
} satisfies Config;
```

```ts title="jest.config.ts" tab={"label":"Node 22.18+"}
import type { Config } from 'jest';
import { createEsmPreset } from 'jest-preset-angular/presets/index.js';

export default {
  //...
  ...createEsmPreset(),
  moduleNameMapper: {
    tslib: 'tslib/tslib.es6.js',
    '^rxjs': '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
  },
} satisfies Config;
```

## Resolve `.mjs/.mts` extensions

:::info

This step is optional and only needed if you are using `.mjs` or `.mts` extensions in your code.

:::

See an example one from [ts-jest](https://kulshekhar.github.io/ts-jest/docs/guides/esm-support)
