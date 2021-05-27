---
id: troubleshooting
title: Troubleshooting
---

You can check Jest [troubleshooting guide](https://jestjs.io/docs/en/troubleshooting)

## Common issues

Problems may arise if you're using custom builds (this preset is tailored for `angular-cli` as firstly priority). Please be advised that every entry in default configuration may be overridden to best suite your app's needs.

### Can't resolve all parameters for SomeClass(?)

With Angular 8 and higher, a [change to the way the Angular CLI works](https://github.com/thymikee/jest-preset-angular/issues/288) may be causing your metadata to be lost. You can update your `tsconfig.spec.json` to include the `emitDecoratorMetadata` compiler option:

```
  "compilerOptions": {
    "emitDecoratorMetadata": true
```

In general, this is related to Angular's reflection and also depends on a reflection library, as e. g. included in `core-js`. We use our own minimal reflection that satisfy Angular's current requirements, but in case these change, you can install `core-js` and import the reflection library in your `setup-jest.ts`:

```typescript
require('core-js/es/reflect');
require('core-js/proposals/reflect-metadata');
```

Note that this might also be related to other issues with the dependency injection and parameter type reflection.

### @Input() bindings are not reflected into fixture when `ChangeDetectionStrategy.OnPush` is used

This issue is not related to Jest, [it's a known Angular bug](https://github.com/angular/angular/issues/12313)

To mitigate this, you need to wrap your component under test, into some container component with default change detection strategy (`ChangeDetectionStrategy.Default`) and pass props through it, or overwrite change detection strategy within `TestBed` setup, if it's not critical for the test.

```ts
// override change detection strategy
beforeEach(async(() => {
  TestBed.configureTestingModule({ declarations: [PizzaItemComponent] })
    .overrideComponent(PizzaItemComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
}));
```

### The animation trigger "transformMenu" has failed

The currently used JSDOM version handles this, but older versions used before v7 of this preset was missing transform property. To patch it for Angular Material, use this workaround.

Add this to your `jestGlobalMocks` file

```js
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
```

Reference: https://github.com/angular/material2/issues/7101

### Unexpected token [import|export|other]

This means, that a file is not transformed through TypeScript compiler, e.g. because it is a JS file with TS syntax, or it is published to npm as uncompiled source files. Here's what you can do.

#### Adjust your `tsconfig.spec.json`:

Since Angular released v6, the default `tsconfig.json` and `tsconfig.spec.json` have been changed. Therefore, `jest` will throw an error

```
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import 'jest-preset-angular/setup-jest';
                                                                                             ^^^^^^
    SyntaxError: Unexpected token import
      at ScriptTransformer._transformAndBuildScript (node_modules/jest-runtime/build/script_transformer.js:403:17)
```

What you need to do is adjust your `tsconfig.spec.json` to add the option `"module": "commonjs",`

A default `tsconfig.spec.json` after modifying will look like this

```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/spec",
    "module": "commonjs",
    "types": [
      "jest",
      "jsdom",
      "node"
    ]
  },
  "include": [
    "**/*.d.ts"
  ]
```

#### Adjust your `transformIgnorePatterns` whitelist:

```json5
{
  jest: {
    transformIgnorePatterns: ['node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic)'],
  },
}
```

By default, Jest doesn't transform `node_modules`, because they should be valid JavaScript files. However, it happens that library authors assume that you'll compile their sources. So you have to tell this to Jest explicitly. Above snippet means that `@ngrx`, `angular2-ui-switch` and `ng-dynamic` will be transformed, even though they're `node_modules`.

### Observable ... is not a function

Note: This fix is only relevant to Angular v5 and lower.

Since v1.0 this preset doesn't import whole `rxjs` library by default for variety of reasons. This may result in breaking your tests that relied on this behavior. It may however become cumbersome to include e.g. `rxjs/add/operator/map` or `rxjs/add/operator/do` for every test, so as a workaround you can include common operators or other necessary imports in your `setup-jest.ts` file:

```js
import 'jest-preset-angular/setup-jest';

// common rxjs imports
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
// ...

import './jestGlobalMocks';
```

### Allow vendor libraries like jQuery, etc...

The same like normal Jest configuration, you can load jQuery in your Jest setup file. For example your Jest setup file is `setup-jest.ts` you can declare jQuery:

```js
window.$ = require('path/to/jquery');
```

or

```js
import $ from 'jquery';
global.$ = global.jQuery = $;
```

The same declaration can be applied to other vendor libraries.

Reference: https://github.com/facebook/jest/issues/708
