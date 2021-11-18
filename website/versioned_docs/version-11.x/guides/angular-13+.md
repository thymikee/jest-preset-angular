---
id: angular-13+
title: Angular >=13
---

**Angular 13** introduces ESM package format for Angular packages. `jest-preset-angular`
currently supports testing with Jest in `CommonJS` mode with **Angular 13** using [default preset](../getting-started/presets.md).
Jest ESM support with **Angular 13** is being worked on and will come in the future releases.

Starting from **11.0.0**, `jest-preset-angular` introduces a few extra changes to be able to run Jest with **Angular 13**:

- `ng-jest-resolver` is introduced as a custom Jest resolver to resolve `.mjs` files.

- `moduleFileExtensions` is updated to include `mjs` files as accepted module format.

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

- If one is **NOT** having `preset: 'jest-preset-angular'` in Jest config, the config needs to be updated with new values for
  `resolver`, `transformIgnorePatterns` and `transform`:

```js
// jest.config.js
module.exports = {
  // ...other options
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
};
```

## Potential issues with Angular 13 ESM package format and workaround

### `Cannot find modules` error when importing any deep paths from Angular ESM format packages

- Angular 13 ESM package format makes Jest resolution not able to resolve the correct `.mjs` files. Even though we introduced
  `ng-jest-resolver` as a part of the preset, this resolver won't work for all scenarios. One might get Jest error like

```
Cannot find module '@angular/common/locales/xx' from 'src/app/app.component.spec.ts'
```

To fix this issue, one needs to add `mjs` to `moduleFileExtensions` as following

```js
// jest.config.js
module.exports = {
  // ...other options
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
};
```

If the issue still **persists**, you might need to configure [moduleNameMapper](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring)
or extend the behavior the default [resolver](https://github.com/thymikee/jest-preset-angular/blob/main/src/resolvers/ng-jest-resolver.ts) of this preset.

### Usage with Angular libraries which are built with Angular CLI 13

Besides, the changes in Angular packages themselves, **Angular** libraries which are built with **Angular CLI 13** also introduce
ESM package format. Similar to Angular packages, Jest doesn't understand `.mjs` files which are in these new format
libraries in Jest **CommonJS** mode.

To fix this issue, one should modify `transformIgnorePatterns` to be as following:

```js
// jest.config.js
module.exports = {
  // ...other options
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
```
