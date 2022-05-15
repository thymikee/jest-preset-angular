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

This means, that a file is not transformed through `TypeScript` compiler, e.g. because it is a `JS` file with `TS` syntax, or
it is published to npm as uncompiled source files. Here's what you can do. A typical Jest error is like this:

```
({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import * as i0 from '@angular/core';
                                                                                                                                           ^^^^^^
    SyntaxError: Cannot use import statement outside a module
```

To fix the issue, one needs to adjust `transformIgnorePatterns` whitelist:

```js
// jest.config.js
module.exports = {
  // ...other options
  transformIgnorePatterns: ['node_modules/(?!@angular|@ngrx)'],
};
```

By default, Jest doesn't transform `node_modules`, because they should be valid JavaScript files. However, it happens that
library authors assume that you'll compile their sources. So you have to tell this to Jest explicitly.
Above snippet means that `@angular`, `@ngrx` will be transformed, even though they're `node_modules`.

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

### Coverage fail but tests pass

This issue happens because Jest uses `Babel` behind the screen to create coverage reporter. To fix this issue, one can do the following:

- Install `babel-jest`, `@babel/core` and `@babel/preset-env`
- Create a `.babelrc` at the same place where Jest config file locates and define the necessary `Babel` plugins.
  For example

```
{
  // this plugin will fix issue with class inheritance
  "plugins": ["@babel/plugin-transform-classes"]
}
```

- Define the usage of `Babel` in Jest config via `ts-jest` option, for example

```
// jest.config.js
module.exports = {
   globals: {
      'ts-jest': {
          //...
          babelConfig: true
      }
   }
}
```
