---
id: absolute-imports
title: Absolute Imports
---

TypeScript supports absolute imports. The preset (starting from v3.0.0) by default understands absolute imports referring to `src`, `app`, `assets` and `environments` directory, so instead:

```ts
import MyComponent from '../../src/app/my.component';
import MyStuff from '../../src/testing/my.stuff';
```

you can use:

```ts
import MyComponent from 'app/my.component';
import MyStuff from 'src/testing/my.stuff';
```

However, if your directory structure differ from that provided by `angular-cli` you can adjust `moduleNameMapper` in Jest config:

```json5
{
  jest: {
    moduleNameMapper: {
      'app/(.*)': '<rootDir>/src/to/app/$1', // override default, why not
      'testing/(.*)': '<rootDir>/app/testing/$1', // add new mapping
    },
  },
}
```

:::important

If you wish to use any absolute import paths which are defined in `paths` of your tsconfig, make sure that you create the
similar mapping for `moduleNameMapper` in Jest config

:::
