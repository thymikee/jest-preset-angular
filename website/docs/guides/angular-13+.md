---
id: angular-13+
title: Angular >=13
---

**Angular 13** introduces ESM package format for Angular packages. `jest-preset-angular`
currently supports testing with Jest in `CommonJS` mode with **Angular 13** using [default preset](https://thymikee.github.io/jest-preset-angular/docs/next/getting-started/presets).
Jest ESM support with **Angular 13** is being worked on and will come in the future releases.

Starting from **11.0.0**, `jest-preset-angular` introduces a few extra changes to be able to run Jest with **Angular 13**:

- `ng-jest-resolver` is introduced as a custom Jest resolver to resolve `.mjs` files.

- `transformIgnorePatterns` is added to inform Jest to transform `.mjs` files.

- `transform` is updated to include `.mjs` extension to transform to `CommonJS` codes.

## Migration steps from Angular < 13

- Upgrade the project to **Angular 13** following https://update.angular.io/

- If one is using the default preset as following:

```js
// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
};
```

there are no migration steps required

- If one is not having `preset: 'jest-preset-angular'` in Jest config, the config needs to be updated with new values for
  `resolver`, `transformIgnorePatterns` and `transform`:

```js
// jest.config.js
module.exports = {
  // ...other options
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  transformIgnorePatterns: ['node_modules/(?!@angular)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
};
```

:::important
Angular 13 libraries are also built automatically into ESM package format. Therefore, the Angular libraries should also
be added to `transformIgnorePatterns` to avoid Jest error `SyntaxError: Cannot use import statement outside a module`,

Example config:

```js
transformIgnorePatterns: ['node_modules/(?!@angular|my-ng-library-a|my-ng-library-b)'];
```

:::
