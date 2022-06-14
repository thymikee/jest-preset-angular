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

If the dependency causing the issue is a sub dependency of a `node_modules` packages or a module designed to be used with nodeJS, a custom resolver could be required to fix the issue. [See below](#resolver-needed-for-some-javascript-library-or-nested-dependencies) for more information.

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

### Resolver needed for some javascript library or nested dependencies

This can happen in two identified cases.

#### Javascript library

When using a javascript SDK/Library in Angular, some javascript methods could fail to be properly rendered in tests. Some examples are the `firebase` and `firebase/compat` SDK.

A typical error could appear as:

```
TypeError: Cannot read properties of undefined (reading 'FacebookAuthProvider')
    import firebase from 'firebase/compat/app';

    > export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
```

#### Nested dependency (`node_modules` package within another package `node_nodules`)

Some nested dependency tree could trigger some errors while running the tests because some bundles (especially ESM ones) could be somehow errored. An example is the `@angular/fire` package which uses the `@firebase/firestore` package.

A typical error could appear as:

```
node_modules\@angular\fire\node_modules\@firebase\firestore\dist\index.esm2017.js:12705
                    function (t, e) {
                    ^^^^^^^^

    SyntaxError: Function statements require a function name
```

#### Resolution

In these cases, a `transformIgnorePatterns` whitelisting could not fix the issue. The solution here is to use a custom `resolver`. You may or may not need to remove entries from `transformIgnorePatterns` whitelisting.

Here is an example of a resolver which would fix `firebase` related packages.

```js
// jest.resolver.js
module.exports = (path, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, {
    ...options,
    // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
    packageFilter: (pkg) => {
      const pkgNamesToTarget = new Set([
        'rxjs',
        '@firebase/auth',
        '@firebase/storage',
        '@firebase/functions',
        '@firebase/database',
        '@firebase/auth-compat',
        '@firebase/database-compat',
        '@firebase/app-compat',
        '@firebase/firestore',
        '@firebase/firestore-compat',
        '@firebase/messaging',
        '@firebase/util',
        'firebase',
      ]);

      if (pkgNamesToTarget.has(pkg.name)) {
        // console.log('>>>', pkg.name)
        delete pkg['exports'];
        delete pkg['module'];
      }

      return pkg;
    },
  });
};
```

```js
// jest.config.js
...
resolver: '<rootDir>/src/jest.resolver.js',
...
```
