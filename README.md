# jest-preset-angular
[![CircleCI Build Status](https://circleci.com/gh/thymikee/jest-preset-angular.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/thymikee/jest-preset-angular)
[![NPM version](https://img.shields.io/npm/v/jest-preset-angular.svg)](https://www.npmjs.com/package/jest-preset-angular)

A preset of [Jest](http://facebook.github.io/jest) configuration for [Angular](https://angular.io/) projects.

This is a part of the article: [Testing Angular faster with Jest](https://www.xfive.co/blog/testing-angular-faster-jest/).

*Note: This preset does not suport AngularJS (1.x). If you want to set up Jest with AngularJS, please see [this blog post](https://medium.com/aya-experience/testing-an-angularjs-app-with-jest-3029a613251).*

## Installation

```bash
yarn add -D jest jest-preset-angular
```

This will install `jest`, `@types/jest`, `ts-jest`, `jest-zone-patch` as dependencies needed to run with Angular projects.

## Usage
In `src` directory create `setupJest.ts` file with following contents:
```js
import 'jest-preset-angular';
import './jestGlobalMocks'; // browser mocks globally available for every test
```

*Note: feel free to copy the `jestGlobalMocks.ts` file from the example directory and save it next to the `setupJest.ts` file.*

...and include this in your `package.json`:
```json
{
  "jest": {
    "preset": "jest-preset-angular",
    "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts"
  }
}
```

## Exposed [configuration](https://github.com/thymikee/jest-preset-angular/blob/master/jest-preset.json)
```json
{
  "globals": {
    "ts-jest": {
      "tsConfigFile": "src/tsconfig.spec.json"
    },
    "__TRANSFORM_HTML__": true
  },
  "transform": {
    "^.+\\.(ts|js|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js"
  },
  "testMatch": [
    "**/__tests__/**/*.+(ts|js)?(x)",
    "**/+(*.)+(spec|test).+(ts|js)?(x)"
  ],
  "moduleFileExtensions": [
    "ts",
    "js",
    "html"
  ],
  "moduleNameMapper": {
    "app/(.*)": "<rootDir>/src/app/$1",
    "assets/(.*)": "<rootDir>/src/assets/$1",
    "environments/(.*)": "<rootDir>/src/environments/$1"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!@ngrx)"
  ]
}
```

### Brief explanation of config
* `<rootDir>` is a special syntax for root of your project (here by default it's project's root /)
* we're using some `"globals"` to pass information about where our tsconfig.json file is that we'd like to be able to transform HTML files through ts-jest
* `"transform"` – run every TS, JS, or HTML file through so called *preprocessor* (we'll get there); this lets Jest understand non-JS syntax
* `"testMatch"` – we want to run Jest on files that matches this glob
* `"moduleFileExtensions"` – our modules are TypeScript and JavaScript files
* `"moduleNameMapper"` – if you're using absolute imports here's how to tell Jest where to look for them; uses regex
* `"setupTestFrameworkScriptFile"` – this is the heart of our config, in this file we'll setup and patch environment within tests are running
* `"transformIgnorePatterns"` – unfortunately some modules (like @ngrx ) are released as TypeScript files, not pure JavaScript; in such cases we cannot ignore them (all node_modules are ignored by default), so they can be transformed through TS compiler like any other module in our project.

## [Preprocessor](https://github.com/thymikee/jest-preset-angular/blob/master/preprocessor.js)
Jest doesn't run in browser nor through dev server. It uses jsdom to abstract browser environment. So we have to cheat a little and inline our templates and get rid of styles (we're not testing CSS) because otherwise Angular will try to make XHR call for our templates and fail miserably.

I used a scrappy regex to accomplish this with minimum effort, but you can also write a babel plugin to make it bulletproof. And btw, don't bother about perf here – Jest heavily caches transforms. That's why you need to run Jest with `--no-cache` flag every time you change it.

## Angular testing environment setup

If you look at your `src/test.ts` (or similar bootstrapping test file) file you'll see similarities to [`setupJest.js`](https://github.com/thymikee/jest-preset-angular/blob/master/setupJest.js). What we're doing here is we're adding globals required by Angular. With [jest-zone-patch](https://github.com/thymikee/jest-zone-patch) we also make sure Jest test methods run in Zone context. Then we initialize the Angular testing environment like normal.

## Snapshot testing

**Since version 1.1.0** it's possible to [snapshot test](http://facebook.github.io/jest/docs/snapshot-testing.html#snapshot-testing-with-jest) your Angular components. Please note it's still under active development and may be a subject of change. You can lookup [example](/example/src/app) for details

Example:

`calc-component.spec.ts`
```js
// some initialization code
test('renders markup to snapshot', () => {
  const fixture = TestBed.createComponent(AppComponent);
  expect(fixture).toMatchSnapshot();
});
```

`__snapshots__/calc-component.spec.ts.snap`
```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`CalcComponent should snap 1`] = `
<app-calc
  prop1={[Function Number]}
>
  <p
    class="a-default-class"
    ng-reflect-klass="a-default-class"
    ng-reflect-ng-class="[object Object]"
  >
    calc works!
  </p>
</app-calc>
`;
```

### Removing empty lines and white-spaces in component snaphots

You will immediately notice, that your snapshot files contain a lot of white spaces and blank lines. This is not an issue with Jest, rather with Angular. It can be mitigated via Angular compiler by setting `preserveWhitespaces: false`

> By default it's set to `true` Angular 5.x, although it may change to be set to `false` in upcoming versions
> (if that occurs, you can stop reading right here, because your issue has been already solved)

Your `TestBed` setup should look like following:

```ts
describe('Component snapshot tests', ()=>{
  // you need to turn TS checking because it's an private API
  const compilerConfig = {preserveWhitespaces: false} as any

  beforeEach(() => {
    TestBed.configureCompiler(compilerConfig)
      .configureTestingModule({...});
  });

})
```

This is indeed very repetitive, so you can extract this in a helper function:

```ts
// test-config.helper.ts

import { TestBed } from '@angular/core/testing'

type CompilerOptions = Partial<{
  providers: any[]
  useJit: boolean
  preserveWhitespaces: boolean
}>
export type ConfigureFn = (testBed: typeof TestBed) => void

export const configureTests = (configure: ConfigureFn, compilerOptions: CompilerOptions = {}) => {
  const compilerConfig: CompilerOptions = {
    preserveWhitespaces: false,
    ...compilerOptions,
  }

  const configuredTestBed = TestBed.configureCompiler(compilerConfig)

  configure(configuredTestBed)

  return configuredTestBed.compileComponents().then(() => configuredTestBed)
}
```

And setup your test with that function like following:

```ts
// foo.component.spec.ts

import { async, ComponentFixture } from '@angular/core/testing'

import { configureTests, ConfigureFn } from '../test-config.helper'

import { AppComponent } from './foo.component';

describe('Component snapshots', () => {

  let fixture: ComponentFixture<FooComponent>;
  let component: FooComponent;

  beforeEach(
    async(() => {
      const configure: ConfigureFn = testBed => {
        testBed.configureTestingModule({
          declarations: [FooComponent],
          imports: [...],
          schemas: [NO_ERRORS_SCHEMA],
        });
      };

      configureTests(configure).then(testBed => {
        fixture = testBed.createComponent(FooComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    })
  );

  it(`should create snapshots without blank lines/white spaces`, () => {
    expect(fixture).toMatchSnapshot();
  });

})
```

## Troubleshooting

Problems may arise if you're using custom builds (this preset is tailored for `angular-cli` as firsty priority). Please be adivsed that every entry in default configuration may be overriden to best suite your app's needs.

### @Input() bindings are not reflected into fixture when `ChangeDetectionStrategy.OnPush` is used

This issue is not related to Jest, [it's a known Angular bug](https://github.com/angular/angular/issues/12313)

To mitigate this, you need to wrap your component under test, into some container component with default change detection strategy (`ChangeDetectionStrategy.Default`) and pass props through it, or overwrite change detection strategy within `TestBed` setup, if it's not critical for the test.

```ts
// override change detection strategy
beforeEach(
  async(() => {
    TestBed.configureTestingModule({ declarations: [PizzaItemComponent] })
      .overrideComponent(PizzaItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  })
);
```

### The animation trigger "transformMenu" has failed
JSDOM missing transform property when using Angular Material, there is a workaround for it.

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

### Absolute imports

TypeScript supports absolute imports. The preset (starting from v3.0.0) by default understands absolute imports referring to `src`, `app`, `assets` and `environments` directory, so instead:
```js
import MyComponent from '../../src/app/my.component';
import MyStuff from '../../src/testing/my.stuff';
```
you can use:
```js
import MyComponent from 'app/my.component';
import MyStuff from 'src/testing/my.stuff';
```
However, if your directory structure differ from that provided by `angular-cli` you can adjust `moduleNameMapper` in Jest config:

```json
{
  "jest": {
    "moduleNameMapper": {
      "app/(.*)": "<rootDir>/src/to/app/$1", // override default, why not
      "testing/(.*)": "<rootDir>/app/testing/$1" // add new mapping
    }
  }
}
```

### Custom tsconfig

Override `globals` object in Jest config:

```json
{
  "jest": {
    "globals": {
     "ts-jest": {
        "tsConfigFile": "src/tsconfig.custom.json"
      },
      "__TRANSFORM_HTML__": true
    }
  }
}
```

If you choose to overide `globals` in order to point at a specific tsconfig, you will need to add `"__TRANSFORM_HTML__": true` to the `globals` section too, otherwise you will get parse errors on any html templates.

### Unexpected token [import|export|other]

This means, that a file is not transformed through TypeScript compiler, e.g. because it is a JS file with TS syntax, or it is published to npm as uncompiled source files. Here's what you can do.

#### Adjust your `tsconfig.spec.json`:
Since Angular released v6, the default `tsconfig.json` and `tsconfig.spec.json` have been changed. Therefore, `jest` will throw an error
```
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import 'jest-preset-angular';
                                                                                             ^^^^^^
    SyntaxError: Unexpected token import
      at ScriptTransformer._transformAndBuildScript (node_modules/jest-runtime/build/script_transformer.js:403:17)
```

What you need to do is adjust your `tsconfig.spec.json` to add the option `"module": "commonjs",`

A default `tsconfig.spec.json` after modifying will look like this
```
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/spec",
    "module": "commonjs",
    "types": [
      "jest",
      "jquery",
      "jsdom",
      "node"
    ]
  },
  "files": [
    "polyfills.ts"
  ],
  "include": [
    "**/*.spec.ts",
    "**/*.d.ts"
  ]
```

#### Adjust your `transformIgnorePatterns` whitelist:

```json
{
  "jest": {
    "transformIgnorePatterns": [
      "node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic)"
    ]
  }
}
```
By default Jest doesn't transform `node_modules`, because they should be valid JavaScript files. However, it happens that library authors assume that you'll compile their sources. So you have to tell this to Jest explicitly. Above snippet means that `@ngrx`, `angular2-ui-switch` and `ng-dynamic` will be transforemed, even though they're `node_modules`.

#### Allow JS files in your TS `compilerOptions`
```json
{
  "compilerOptions": {
    "allowJs": true
  }
}
```
This tells `ts-jest` (a preprocessor this preset using to transform TS files) to treat JS files the same as TS ones.

#### Transpile js files through `babel-jest`
Some vendors publish their sources without transpiling. You need to say jest to transpile such files manually since `typescript` (and thus `ts-jest` used by this preset) do not transpile them.
1. Install `babel-preset-env` and add `.babelrc` (or modify existing if needed) with that contents:
```
{
  "presets": ["env"]
}
```
2. Update Jest configuration (by default TypeScript process untranspiled JS files which is source of the problem):
```js
{
  "jest": {
    "transform": {
      "^.+\\.(ts|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js",
      "^.+\\.js$": "babel-jest"
    },
  }
}
```

### Observable ... is not a function

Since v1.0 this preset doesn't import whole `rxjs` library by default for variety of reasons. This may result in breaking your tests that relied on this behavior. It may however become cumbersome to include e.g. `rxjs/add/operator/map` or `rxjs/add/operator/do` for every test, so as a workaround you can include common operators or other necessary imports in your `setupJest.ts` file:

```js
import 'jest-preset-angular';

// common rxjs imports
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
// ...

import './jestGlobalMocks';
```

### Allow vendor libraries like jQuery, etc...

The same like normal Jest configuration, you can load jQuery in your Jest setup file. For example your Jest setup file is `setupJest.ts` you can declare jQuery:

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
