# jest-preset-angular
[![CircleCI Build Status](https://circleci.com/gh/thymikee/jest-preset-angular.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/thymikee/jest-preset-angular)
[![NPM version](https://img.shields.io/npm/v/jest-preset-angular.svg)](https://www.npmjs.com/package/jest-preset-angular)

A preset of [Jest](http://facebook.github.io/jest) configuration for [Angular](https://angular.io/) projects. 

This is a part of the article: [Testing Angular faster with Jest](https://www.xfive.co/blog/testing-angular-faster-jest/).

*Note: This preset does not suport AngularJS (1.5+). If you want to set up Jest with AngularJS, please see [this blog post](https://medium.com/aya-experience/testing-an-angularjs-app-with-jest-3029a613251).*

## Usage
In `src` directory create `setupJest.ts` file with following contents:
```js
import 'jest-preset-angular';
import './jestGlobalMocks'; // browser mocks globally available for every test
```

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
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
  "moduleFileExtensions": [
    "ts",
    "js",
    "html"
  ],
  "moduleNameMapper": {
    "(.*)": "<rootDir>/src/$1"
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
* `"testRegex"` – we want to run Jest on files that matches this regex
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



## Troubleshooting

Problems may arise if you're using custom builds (this preset is tailored for `angular-cli` as firsty priority). Please be adivsed that every entry in default configuration may be overriden to best suite your app's needs.

### Absolute imports

TypeScript supports absolute imports. The preset by default understands all absolute imports referring to `src` directory, so instead:
```js
import MyComponent from '../../src/app/my.component';
import MyStuff from '../../src/testing/my.stuff';
```
you can use:
```js
import MyComponent from 'app/my.component';
import MyStuff from 'testing/my.stuff';
```
However, if your directory structure differ from that provided by `angular-cli` you can adjust `moduleNameMapper` in Jest config:
```js
{
  "jest": {
    "moduleNameMapper": {
       "(.*)": "$1", // override default if it causes problems
       "testing/(.*)": "<rootDir>/app/testing/$1"
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

### Unexpected token [import|export|other]

This means, that a file is not transformed through TypeScript compiler, e.g. because it is a JS file with TS syntax, or it is published to npm as uncompiled source files. Here's what you can do.

#### Adjust your `transformIgnorePatterns` whitelist:
```js
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
