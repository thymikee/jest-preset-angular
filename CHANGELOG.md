## [9.0.7](https://github.com/thymikee/jest-preset-angular/compare/v9.0.6...v9.0.7) (2021-08-20)


### Bug Fixes

* **utils:** support Yarn workspace for `ngcc-jest-processor` ([#991](https://github.com/thymikee/jest-preset-angular/issues/991)) ([4735f90](https://github.com/thymikee/jest-preset-angular/commit/4735f90f6c54a9ce8de3c7d5a42d7f4628d19a5f)), closes [#990](https://github.com/thymikee/jest-preset-angular/issues/990)



## [9.0.6](https://github.com/thymikee/jest-preset-angular/compare/v9.0.5...v9.0.6) (2021-08-17)


### Bug Fixes

* **config:** set `allowJs: true` internally always ([#976](https://github.com/thymikee/jest-preset-angular/issues/976)) ([9900c8b](https://github.com/thymikee/jest-preset-angular/commit/9900c8bda48c9502f316060956155fe5e718609f)), closes [#974](https://github.com/thymikee/jest-preset-angular/issues/974)
* **utils:** throw error when cannot find `@angular/core` for `ngcc-jest-preprocessor` util ([#981](https://github.com/thymikee/jest-preset-angular/issues/981)) ([c35d3f2](https://github.com/thymikee/jest-preset-angular/commit/c35d3f2a3cd7ad2a5e5590ea666e6a2c1b685635))



## [9.0.5](https://github.com/thymikee/jest-preset-angular/compare/v9.0.4...v9.0.5) (2021-07-22)


### Features

* remove more trailing whitespaces for component fixture snapshot ([#961](https://github.com/thymikee/jest-preset-angular/issues/961)) ([e51cf6f](https://github.com/thymikee/jest-preset-angular/commit/e51cf6ff44b0089a16ac30dcc70e080cac1563ef)), closes [#287](https://github.com/thymikee/jest-preset-angular/issues/287)


### Code Refactoring

* remove `webpack` and `@angular-devkit/build-angular` from peer dependencies and optional dependencies ([#973](https://github.com/thymikee/jest-preset-angular/issues/973)) ([ce7fc60](https://github.com/thymikee/jest-preset-angular/commit/ce7fc6017550e73f68eae02d463c6f16b0a4e0ac))



## [9.0.4](https://github.com/thymikee/jest-preset-angular/compare/v9.0.3...v9.0.4) (2021-06-15)


### Bug Fixes

* widen range for optional webpack dependency ([#955](https://github.com/thymikee/jest-preset-angular/issues/955)) ([b3e8047](https://github.com/thymikee/jest-preset-angular/commit/b3e80475e8e90e4a7ff998c685849d44a1876056))



## [9.0.3](https://github.com/thymikee/jest-preset-angular/compare/v9.0.2...v9.0.3) (2021-06-08)


### Bug Fixes

* add missing `@angular/platform-browser-dynamic` to peer dep ([c1729e4](https://github.com/thymikee/jest-preset-angular/commit/c1729e4c265499ef8cb470e88476410413c25c14))



## [9.0.2](https://github.com/thymikee/jest-preset-angular/compare/v9.0.1...v9.0.2) (2021-06-06)


### Bug Fixes

* allow ESM preset to be used in monorepo structure ([#942](https://github.com/thymikee/jest-preset-angular/issues/942)) ([b402e28](https://github.com/thymikee/jest-preset-angular/commit/b402e2882477d61f8b91cfe39ee5da3b7e1d4381))
* revert `exports` in `package.json` ([#948](https://github.com/thymikee/jest-preset-angular/issues/948)) ([928e08b](https://github.com/thymikee/jest-preset-angular/commit/928e08bd2077bde98c613e9f47c924a95bec84e7)), closes [/github.com/thymikee/jest-preset-angular/issues/941#issuecomment-854580348](https://github.com//github.com/thymikee/jest-preset-angular/issues/941/issues/issuecomment-854580348)



## [9.0.1](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0...v9.0.1) (2021-05-28)


### Bug Fixes

* add missing export `build` in `package.json` ([#936](https://github.com/thymikee/jest-preset-angular/issues/936)) ([b035581](https://github.com/thymikee/jest-preset-angular/commit/b0355814b490758dcdf8a5708524c63d94618014)), closes [#935](https://github.com/thymikee/jest-preset-angular/issues/935)



# [9.0.0](https://github.com/thymikee/jest-preset-angular/compare/v8.4.0...v9.0.0) (2021-05-27)


### Bug Fixes

* support all node versions >= **12.13.0** ([#923](https://github.com/thymikee/jest-preset-angular/issues/923)) ([96782a6](https://github.com/thymikee/jest-preset-angular/commit/96782a652821864576aa1cb96e57a39187172dd4)), closes [#920](https://github.com/thymikee/jest-preset-angular/issues/920)
* **presets:** remove `moduleNameMapper` config ([#910](https://github.com/thymikee/jest-preset-angular/issues/910)) ([df482bc](https://github.com/thymikee/jest-preset-angular/commit/df482bcb4c99b441f2fef8def04d10b8a1188deb)), closes [#908](https://github.com/thymikee/jest-preset-angular/issues/908)


### Features

* support **Jest 27** ([#926](https://github.com/thymikee/jest-preset-angular/issues/926)) ([1c761f8](https://github.com/thymikee/jest-preset-angular/commit/1c761f873686a96edeb4c3cb2f184d8a88f5f52a))
* **config:** load zone ESM when running jest in ESM mode ([#892](https://github.com/thymikee/jest-preset-angular/issues/892)) ([e03ec19](https://github.com/thymikee/jest-preset-angular/commit/e03ec19c30b6ff257d0ddd7a8783d65ed5f43f8e)), closes [#751](https://github.com/thymikee/jest-preset-angular/issues/751)
* add `exports` field to `package.json`, see https://nodejs.org/api/packages.html#packages_package_entry_points
* **presets:** add type definition for `presets` entry point ([#801](https://github.com/thymikee/jest-preset-angular/issues/801)) ([e4ff0c0](https://github.com/thymikee/jest-preset-angular/commit/e4ff0c0e19e5941e7e7db1da9b5c29e01d58ab58))
* **compiler:** support ESM ([#721](https://github.com/thymikee/jest-preset-angular/issues/721)) ([a2166f8](https://github.com/thymikee/jest-preset-angular/commit/a2166f859b1c89340ee889520595d05fa3cf65dc))
* **presets:** add ESM preset ([#723](https://github.com/thymikee/jest-preset-angular/issues/723)) ([b0073b0](https://github.com/thymikee/jest-preset-angular/commit/b0073b0f3a7e24f06d136367a1c2e676ac76e59e))
* **compiler:** use `replace-resources` AST transformer from Angular ([#708](https://github.com/thymikee/jest-preset-angular/issues/708)) ([1b20c19](https://github.com/thymikee/jest-preset-angular/commit/1b20c196586487a119f7e5e545c2a7fcfe6359fb))
* **compiler:** use `downlevel-ctor` AST transformer from Angular ([#730](https://github.com/thymikee/jest-preset-angular/issues/730)) ([1f964c3](https://github.com/thymikee/jest-preset-angular/commit/c1242868557a95d79a7bb5a108153496e1f964c3))


### Performance Improvements

* **compiler:** reuse `cacheFS` from jest to reduce file system reading ([#679](https://github.com/thymikee/jest-preset-angular/issues/679)) ([f5d9d4b](https://github.com/thymikee/jest-preset-angular/commit/f5d9d4b9c0b5440ab14ddb4a636ea84d384e3408))
* **config:** set `skipLibCheck: true` if not defined in tsconfig ([#678](https://github.com/thymikee/jest-preset-angular/issues/678)) ([0df3ce1](https://github.com/thymikee/jest-preset-angular/commit/0df3ce159c6778893dc08e35bdb99d0f3e0285b5))


## BREAKING CHANGES

* Drop support for Angular < **9.0**, see https://angular.io/guide/releases#support-policy-and-schedule.
* Drop support for Node.js version **10** since it becomes EOL on **2021-04-30**. Required Node version now is **>=12.13.0**.
* Require **Jest 27**.
* Users who are using `import 'jest-preset-angular'` should change to `import 'jest-preset-angular/setup-jest'`
* **transformers:** The AST transformers `InlineFilesTransformer` and `StripStylesTransformer` are **REMOVED** and
  default `jest-preset-angular` uses AST transformers from `@angular/compiler-cli` and `@ngtools/webpack`.
  One should remove the old transformers from the jest config.
* **compiler:** `jest-preset-angular` now switches to default to use its own transformer which wraps around `ts-jest` to transform codes.

Users who are currently doing in jest config
```
// jest.config.js
module.exports = {
    // [...]
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
}
```

should change to
```
// jest.config.js
module.exports = {
    // [...]
    transform: {
      '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
}
```
* **serializers:**: snapshot serializer paths have been changed:
   - `'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js'` is changed to `'jest-preset-angular/build/serializers/no-ng-attributes`.
   - `'jest-preset-angular/build/AngularSnapshotSerializer.js'` is changed to `'jest-preset-angular/build/serializers/ng-snapshot`.
   - `'jest-preset-angular/build/HTMLCommentSerializer.js'` is changed to `'jest-preset-angular/build/serializers/html-comment`.
* When generating a new project from Angular CLI, by default the `tsconfig.json` doesn't contain any path mappings
  hence removing `moduleNameMapper` from preset will make sure that the preset works in pair with `tsconfig.json`.
  Ones who are relying on the value of `moduleNameMapper` from the preset should create their own `moduleNameMapper`
  config manually or via `ts-jest` util https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping. 

If you wish to reuse the old configuration of `moduleNameMapper`, you can put this into your Jest config
```
moduleNameMapper: {
  '^src/(.*)$': '<rootDir>/src/$1',
  '^app/(.*)$': '<rootDir>/src/app/$1',
  '^assets/(.*)$': '<rootDir>/src/assets/$1',
  '^environments/(.*)$': '<rootDir>/src/environments/$1',
}
```

* By default, if `skipLibCheck` is not defined in tsconfig, `jest-preset-angular` will set it to `true`. If one wants to have it as `false`, one can set explicitly in tsconfig.
* **compiler:** `jest-preset-angular` now switches to default to use its own transformer which wraps around `ts-jest` to transform codes.

Users who are currently doing in jest config
```
// jest.config.js
module.exports = {
    // [...]
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
}
```

should change to
```
// jest.config.js
module.exports = {
    // [...]
    transform: {
      '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
}
```



# [9.0.0-next.14](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0-next.13...v9.0.0-next.14) (2021-05-05)


### Bug Fixes

* **presets:** remove `moduleNameMapper` config ([#910](https://github.com/thymikee/jest-preset-angular/issues/910)) ([df482bc](https://github.com/thymikee/jest-preset-angular/commit/df482bcb4c99b441f2fef8def04d10b8a1188deb)), closes [#908](https://github.com/thymikee/jest-preset-angular/issues/908)


## BREAKING CHANGES

When generating a new project from Angular CLI, by default the `tsconfig.json` doesn't contain any path mappings hence removing `moduleNameMapper` from preset will make sure that the preset works in pair with `tsconfig.json`.

Ones who are relying on the value of `moduleNameMapper` from the preset should create their own `moduleNameMapper` config manually or via `ts-jest` util https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping



# [9.0.0-next.13](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0-next.12...v9.0.0-next.13) (2021-04-18)


### BREAKING CHANGES

* Drop support for Node.js version 10 since it becomes EOL on **2021-04-30**. To support Angular 12, Node.js **12.13+** or **14.15+** is required.



# [9.0.0-next.12](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0-next.11...v9.0.0-next.12) (2021-03-31)


### Bug Fixes

* define export path for `jest-preset` ([#896](https://github.com/thymikee/jest-preset-angular/issues/896)) ([218b217](https://github.com/thymikee/jest-preset-angular/commit/218b217c02d053ab98f476f26f716e95d407ac5c))



# [9.0.0-next.11](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0-next.10...v9.0.0-next.11) (2021-03-21)


### Features

* **config:** load zone ESM when running jest in ESM mode ([#892](https://github.com/thymikee/jest-preset-angular/issues/892)) ([e03ec19](https://github.com/thymikee/jest-preset-angular/commit/e03ec19c30b6ff257d0ddd7a8783d65ed5f43f8e)), closes [#751](https://github.com/thymikee/jest-preset-angular/issues/751)


### BREAKING CHANGES

* add `exports` field to `package.json`, see https://nodejs.org/api/packages.html#packages_package_entry_points



# [8.4.0](https://github.com/thymikee/jest-preset-angular/compare/v8.3.2...v8.4.0) (2021-03-04)


### Features

* add `ngcc-jest-processor` util script ([#853](https://github.com/thymikee/jest-preset-angular/issues/853)) ([e8c9689](https://github.com/thymikee/jest-preset-angular/commit/e8c9689fa792fb64634156eef00b06e3b1e604e5))


### DEPRECATIONS

* Import serializer via `'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js'` is deprecated in favor of `'jest-preset-angular/build/serializers/no-ng-attributes'`
* Import serializer via `'jest-preset-angular/build/AngularSnapshotSerializer.js'` is deprecated in favor of `'jest-preset-angular/build/serializers/ng-snapshot'`
* Import serializer via `'jest-preset-angular/build/HTMLCommentSerializer.js'` is deprecated in favor of `'jest-preset-angular/build/serializers/html-comment'`
* Import setup file via `import 'jest-preset-angular'` is deprecated in favor of `import 'jest-preset-angular/setup-jest'`



# [9.0.0-next.8](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0-next.7...v9.0.0-next.8) (2021-02-12)


### Features

* **compiler:** use constructor downlevel ctor transformer for `isolatedModules: true` ([#792](https://github.com/thymikee/jest-preset-angular/issues/792)) ([00c71ce](https://github.com/thymikee/jest-preset-angular/commit/00c71ceaa06e58432d201d9d5f8deb33e8f54665))
* **presets:** add type definition for `presets` entry point ([#801](https://github.com/thymikee/jest-preset-angular/issues/801)) ([e4ff0c0](https://github.com/thymikee/jest-preset-angular/commit/e4ff0c0e19e5941e7e7db1da9b5c29e01d58ab58))



# [9.0.0-next.6](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0-next.5...v9.0.0-next.6) (2021-01-14)


### Features

* **compiler:** support ESM for `isolatedModules: false` ([#721](https://github.com/thymikee/jest-preset-angular/issues/721)) ([a2166f8](https://github.com/thymikee/jest-preset-angular/commit/a2166f859b1c89340ee889520595d05fa3cf65dc))
* **compiler:** use `replace-resources` for `isolatedModules: true` ([#717](https://github.com/thymikee/jest-preset-angular/issues/717)) ([76c25d2](https://github.com/thymikee/jest-preset-angular/commit/76c25d2d8d1de0fa458b46b473c200a2d6bd542a))
* **presets:** add ESM preset ([#723](https://github.com/thymikee/jest-preset-angular/issues/723)) ([b0073b0](https://github.com/thymikee/jest-preset-angular/commit/b0073b0f3a7e24f06d136367a1c2e676ac76e59e))



# [9.0.0-next.5](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0-next.4...v9.0.0-next.5) (2021-01-06)


### Features

* **compiler:** use `replace-resources` transformer from Angular ([#708](https://github.com/thymikee/jest-preset-angular/issues/708)) ([1b20c19](https://github.com/thymikee/jest-preset-angular/commit/1b20c196586487a119f7e5e545c2a7fcfe6359fb))
* **utils:** add `es2015` to `ngcc` script's properties ([#701](https://github.com/thymikee/jest-preset-angular/issues/701)) ([a13070b](https://github.com/thymikee/jest-preset-angular/commit/a13070b4174633e80d37ede754d57b3c2374803f))


### BREAKING CHANGES

* `isolatedModules: true` will use `inline-files` and `strip-styles` transformers as default transformers.
* `isolatedModules: false` will use `replace-resources` transformer from `@ngtools/webpack` (besides the existing `downlevel-ctor` transformer). This will make `jest-preset-angular` become closer to what Angular CLI does with Karma + Jasmine.
* For users who migrate from **v8.3.2** to **9.0.0**, any references to `'jest-preset-angular/build/InlineFilesTransformer'` and `'jest-preset-angular/build/StripStylesTransformer'` should be removed from jest config.
* For users who migrate from **9.0.0-next.4**, any references to `jest-preset-angular/build/transformers/inline-files` and `jest-preset-angular/build/transformers/inline-files` should be removed from jest config.



# [9.0.0-next.4](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0-next.0...v9.0.0-next.4) (2020-12-18)


### Performance Improvements

* **compiler:** reuse `cacheFS` from jest to reduce file system reading ([#679](https://github.com/thymikee/jest-preset-angular/issues/679)) ([f5d9d4b](https://github.com/thymikee/jest-preset-angular/commit/f5d9d4b9c0b5440ab14ddb4a636ea84d384e3408))
* **config:** set `skipLibCheck: true` if not defined in tsconfig ([#678](https://github.com/thymikee/jest-preset-angular/issues/678)) ([0df3ce1](https://github.com/thymikee/jest-preset-angular/commit/0df3ce159c6778893dc08e35bdb99d0f3e0285b5))


### BREAKING CHANGES

* By default, if `skipLibCheck` is not defined in tsconfig, `jest-preset-angular` will set it to `true`. If one wants to have it as `false`, one can set explicitly in tsconfig.
* Require Jest 27



# [9.0.0-next.1](https://github.com/thymikee/jest-preset-angular/compare/v9.0.0-next.0...v9.0.0-next.1) (2020-10-29)


### BREAKING CHANGES

* **compiler:** `jest-preset-angular` now switches to default to use its own transformer which wraps around `ts-jest` to transform codes.

Users who are currently doing in jest config
```
// jest.config.js
module.exports = {
    // [...]
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
}
```

should change to
```
// jest.config.js
module.exports = {
    // [...]
    transform: {
      '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
}
```



## [8.3.2](https://github.com/thymikee/jest-preset-angular/compare/v8.3.1...v8.3.2) (2020-10-23)


### Chores

* **config**: switch to `tsconfig` for `jest-preset.js`




# [9.0.0-next.0](https://github.com/thymikee/jest-preset-angular/compare/v8.3.1...v9.0.0-next.0) (2020-10-18)


### Chore

* Follow Angular support policy ([#468](https://github.com/thymikee/jest-preset-angular/issues/468)) ([013e6d1](https://github.com/thymikee/jest-preset-angular/commit/013e6d15fc52268304d5fb205b855419386a0be2))


### BREAKING CHANGES

We are working on Ivy compatibility for this preset. This requires introducing a different Jest transformer than the default
one from `ts-jest`. To get updates on this work, please subscribe to [#409](https://github.com/thymikee/jest-preset-angular/issues/409)

* Users who are using `import 'jest-preset-angular'` should change to `import 'jest-preset-angular/setup-jest'`
* Drop support for Angular < **8.0**, see https://angular.io/guide/releases#support-policy-and-schedule
* **transformers:** The AST transformers `InlineFilesTransformer` and `StripStylesTransformer` are **REMOVED** and default `jest-preset-angular` uses AST transformers from `@angular/compiler-cli`. One should remove the old transformers from the jest config.
* **serializers:** One is using all `jest-preset-angular` snapshot serializers should change jest config to have:
```
// jest.config.js
const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers')

module.exports = {
     // [...]
     snapshotSerializers: jestPresetAngularSerializers,
}
```

One is using one of `jest-preset-angular` snapshot serializers should change jest config to have:
```
// jest.config.js
module.exports = {
     // [...]
     snapshotSerializers: [
          'jest-preset-angular/build/serializers/html-comment'
     ]
}
```
or
```
// package.json
{
      // [...]
     "jest": {
           snapshotSerializers: [
                "jest-preset-angular/build/serializers/html-comment"
           ]
      }
}
```



## [8.3.1](https://github.com/thymikee/jest-preset-angular/compare/v8.2.1...v8.3.1) (2020-08-23)


### Bug Fixes

* Correct wrong published content in **v8.3.0**




# [8.3.0](https://github.com/thymikee/jest-preset-angular/compare/v8.2.1...v8.3.0) (2020-08-23)


### Features

* add support for zone.js 0.11.1 ([#448](https://github.com/thymikee/jest-preset-angular/issues/448)) ([3879976](https://github.com/thymikee/jest-preset-angular/commit/3879976f80e2b41533e6a4c564993490d1ab8cc3))


### Bug Fixes

* change `astTransformers` in preset config ([#443](https://github.com/thymikee/jest-preset-angular/pull/443)) ([276784](https://github.com/thymikee/jest-preset-angular/commit/1011d15bb8102c4762f19b3997bd161a2b276784)), closes [#439](https://github.com/thymikee/jest-preset-angular/issues/439)



## [8.2.1](https://github.com/thymikee/jest-preset-angular/compare/v8.2.0...v8.2.1) (2020-06-19)


### Features

* support jest 26 ([#374](https://github.com/thymikee/jest-preset-angular/issues/374)) ([5afe077](https://github.com/thymikee/jest-preset-angular/commit/5afe077b7d03dc6bd3f53621bfa1dfaae4054e61))



# [8.2.0](https://github.com/thymikee/jest-preset-angular/compare/v8.1.3...v8.2.0) (2020-05-07)


### Features

* Merge in class filtering solution from issue [#336](https://github.com/thymikee/jest-preset-angular/issues/366) ([#343](https://github.com/thymikee/jest-preset-angular/issues/343)) ([e443d1b](https://github.com/thymikee/jest-preset-angular/commit/bcb2c22597bc172d8c8219f23e66af11ae443d1b)), closes [#336](https://github.com/thymikee/jest-preset-angular/issues/336)



## [8.1.3](https://github.com/thymikee/jest-preset-angular/compare/v8.1.2...v8.1.3) (2020-03-31)


### Features

* make `AngularSnapshotSerializer` compatible with Ivy ([#366](https://github.com/thymikee/jest-preset-angular/issues/366)) ([c648786](https://github.com/thymikee/jest-preset-angular/commit/c6487869e4501bb13a25ab44e6eb5ca53d7cf1cf))



## [8.1.2](https://github.com/thymikee/jest-preset-angular/compare/v8.1.1...v8.1.2) (2020-03-15)


### Bug Fixes

* simplify zone patch test method impl ([#361](https://github.com/thymikee/jest-preset-angular/issues/361)) ([4cc8708](https://github.com/thymikee/jest-preset-angular/commit/4cc87089e331d9c8bf63a5fe360ae410e3a2159a))



## [8.1.1](https://github.com/thymikee/jest-preset-angular/compare/v8.1.0...v8.1.1) (2020-03-12)


### Bug Fixes

* `zone.js` patch jest should handle done correctly ([#357](https://github.com/thymikee/jest-preset-angular/issues/357)) ([34287f5](https://github.com/thymikee/jest-preset-angular/commit/34287f5bddfbf9192d3191631274f7c60b966b3b))



# [8.1.0](https://github.com/thymikee/jest-preset-angular/compare/v8.0.0...v8.1.0) (2020-03-10)


### Bug Fixes

* test.each should be in ProxyZone ([#340](https://github.com/thymikee/jest-preset-angular/issues/340)) ([17dc5bf](https://github.com/thymikee/jest-preset-angular/commit/17dc5bf93caf40a6bb469cb54083d86a8f01115b)), closes [#339](https://github.com/thymikee/jest-preset-angular/issues/339)



# [8.0.0](https://github.com/thymikee/jest-preset-angular/compare/v7.1.1...v8.0.0) (2019-10-21)


### Features

* **breaking:** Refine ast-transformer behavior: only transform `styles`-assignments inside @Component ([#261](https://github.com/thymikee/jest-preset-angular/pull/261)) and TypeScript v2.9 `createStringLiteral` is polyfilled if an older version is used ([#272](https://github.com/thymikee/jest-preset-angular/issues/272)).
* **breaking:** Restructure project with `src` and `build` folder ([#307](https://github.com/thymikee/jest-preset-angular/pull/307)).
* **breaking:** Support `tsconfig.spec.json` in root folder by default ([#309](https://github.com/thymikee/jest-preset-angular/pull/309)).
* **breaking:** Enable `AngularNoAngularNoNgAttributesSnapshotSerializer` (created in [#97](https://github.com/thymikee/jest-preset-angular/pull/97)) by default ([#318](https://github.com/thymikee/jest-preset-angular/pull/318)).
* Remove `core-js` dependency by using internal, minimal `reflect-metadata` ([#315](https://github.com/thymikee/jest-preset-angular/pull/315)).


### Chores

* Update jsdom to current version 15 ([#318](https://github.com/thymikee/jest-preset-angular/pull/318)).


### BREAKING CHANGES

* If the `astTransformers` are referenced in a custom `jest` config, `[ 'jest-preset-angular/build/InlineFilesTransformer', 'jest-preset-angular/build/StripStylesTransformer']` have to be set instead.
* Serializers, transformers and `setupJest` have to be referenced from the `jest-preset-angular/build/`-folder in a custom config. Existing references have to be aligned.
* If your `tsconfig.spec.json` is located in `src`, move it to your root folder and adjust the referenced files and paths inside, or align your jest configuration as discussed in the [README.md](https://github.com/thymikee/jest-preset-angular/blob/master/README.md#custom-tsconfig).
* In an Angular 8 project or higher, `core-js` should no longer be a dependency declared in `package.json`, unless it's imported manually in the code.



## [7.1.0](https://github.com/thymikee/jest-preset-angular/compare/v7.0.0...v7.1.0) (2019-05-20)


### Features

* component serializer without ng-* attributes ([#97](https://github.com/thymikee/jest-preset-angular/issues/97)) ([1079528](https://github.com/thymikee/jest-preset-angular/commit/10795285b9b641ee1f428011e97037050b544011))
* support `core-js` >=2.0.0 < 4.0.0 ([#246](https://github.com/thymikee/jest-preset-angular/issues/246)) ([239a647](https://github.com/thymikee/jest-preset-angular/commit/239a6471dcbeac9a0c4d4d33e077060c109e0089))


### Chores

* Fixed a CI cache issue in the example app, which would not always use the current version of the preset in the test runs.



# [7.0.0](https://github.com/thymikee/jest-preset-angular/compare/v6.0.1...v7.0.0) (2019-03-08)


### Bug Fixes

* moved `@types/jest` to `devDependencies` ([#227](https://github.com/thymikee/jest-preset-angular/issues/227)) ([d65fdc9](https://github.com/thymikee/jest-preset-angular/commit/d65fdc9092188bcb6d30bb5afada0afb89c53588))


### Features

* adjust semver range of `jest-zone-patch` ([#209](https://github.com/thymikee/jest-preset-angular/issues/209)) ([1c60de7](https://github.com/thymikee/jest-preset-angular/commit/1c60de799bcfbd22ff7bf79a67bb58c31ac8b53e))
* Import jest-zone-patch ([#214](https://github.com/thymikee/jest-preset-angular/issues/214)) ([66987ed](https://github.com/thymikee/jest-preset-angular/commit/66987ed0e00ace117b3900e5b0e9b5dbef4f071c)), closes [/github.com/thymikee/jest-zone-patch/pull/9#issuecomment-445772763](https://github.com//github.com/thymikee/jest-zone-patch/pull/9/issues/issuecomment-445772763)
* Jest 24 ([#224](https://github.com/thymikee/jest-preset-angular/issues/224)) ([7f7d0f4](https://github.com/thymikee/jest-preset-angular/commit/7f7d0f4a7f2fafc699e0f720090fba4547dfaec4)), closes [#223](https://github.com/thymikee/jest-preset-angular/issues/223)
* jsdom-v13 ([#229](https://github.com/thymikee/jest-preset-angular/issues/229)) ([864440e](https://github.com/thymikee/jest-preset-angular/commit/864440e93172368c60daa9423aa31e4e37c0e3ad)), closes [#216](https://github.com/thymikee/jest-preset-angular/issues/216)
* **breaking:** Implement `astTransformer` compatible with `ts-jest` 23.10 ([#204](https://github.com/thymikee/jest-preset-angular/issues/204)) ([adad842](https://github.com/thymikee/jest-preset-angular/commit/adad842f3df3bb96c57e9790a74a4ed9bdb7b3b6)), closes [#195](https://github.com/thymikee/jest-preset-angular/issues/195) [#201](https://github.com/thymikee/jest-preset-angular/issues/201) [#201](https://github.com/thymikee/jest-preset-angular/issues/201) [#201](https://github.com/thymikee/jest-preset-angular/issues/201)


### Chores

* Remove template literal character escaping, reverts [#34](https://github.com/thymikee/jest-preset-angular/pull/34)
* Migrate CI config to CircleCI v2 ([#212](https://github.com/thymikee/jest-preset-angular/pull/212))
* **docs:** do not use `.babelrc` file but rather `babel.config.js` ([#231](https://github.com/thymikee/jest-preset-angular/pull/231))
* **docs:** add `astTransformers` in configuration example ([#218](https://github.com/thymikee/jest-preset-angular/pull/218))


### BREAKING CHANGES

* If `global` and `transform` are not set in your configuration in `jest.config.json`, `jest.config.js` or `package.json`, you are done.
* If the `global` value of the configuration was overridden, adjust
  * The option `"__TRANSFORM_HTML__": true` is not required anymore. Instead the `"stringifyContentPathRegex": "\\.html$"` should be used inside the `ts-jest`-configuration.
  * Change the assignment identifier from `tsConfigFile` to `tsConfig`.
  * Add the `astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')]` so Jest can work with `templateUrl`-assignments in Component decorators.
* If `transform` was overridden, remove the entry pointing at `preprocessor.js` and add `"^.+\\.(ts|js|html)$": "ts-jest"` to the `transform`-object.
* If in doubt, check the configuration example in `jest-preset.json`.



## [6.0.1](https://github.com/thymikee/jest-preset-angular/compare/v6.0.0...v6.0.1) (2018-09-19)


### Bug Fixes

* restrict version of `ts-jest` to ~23.1.3 ([#196](https://github.com/thymikee/jest-preset-angular/issues/196)) ([62673cf](https://github.com/thymikee/jest-preset-angular/commit/62673cf23e5ecfd77ec293ea23d1ccd55035f22c))
* support backtick quoted `templateUrl` ([#182](https://github.com/thymikee/jest-preset-angular/issues/182)) ([145c8ea](https://github.com/thymikee/jest-preset-angular/commit/145c8eaa0fb5d28a4031f5aafad4b85087b2da1c))


### Chores

* Add HeroesComponent example with mocked service provider ([#110](https://github.com/thymikee/jest-preset-angular/pull/110))
* **docs:** Adjust troubleshooting to support configuration with Angular 6 ([#187](https://github.com/thymikee/jest-preset-angular/pull/187))



# [6.0.0](https://github.com/thymikee/jest-preset-angular/compare/v5.2.3...v6.0.0) (2018-08-03)


### Features

* Compatibility with `jest` v23 ([#173](https://github.com/thymikee/jest-preset-angular/pull/173))



## [5.2.3](https://github.com/thymikee/jest-preset-angular/compare/v5.2.2...v5.2.3) (2018-06-26)


### Bug Fixes

* transformer breaking on spaces before colon ([#165](https://github.com/thymikee/jest-preset-angular/issues/165)) ([bd5b569](https://github.com/thymikee/jest-preset-angular/commit/bd5b5692fd6ccc79293edd9608decd2a717cf8bc)), closes [#164](https://github.com/thymikee/jest-preset-angular/issues/164)



## [5.2.2](https://github.com/thymikee/jest-preset-angular/compare/v5.2.1...v5.2.2) (2018-04-27)


### Bug Fixes

* update `STYLE_URLS_REGEX` to not break on multiple new lines ([#139](https://github.com/thymikee/jest-preset-angular/pull/139))


### Chores

* specify angular modules as peerDependencies ([#141](https://github.com/thymikee/jest-preset-angular/pull/141))
* **docs:** add more troubleshooting docs ([#129](https://github.com/thymikee/jest-preset-angular/pull/129))


## [5.2.1](https://github.com/thymikee/jest-preset-angular/compare/v5.2.0...v5.2.1) (2018-03-08)


### Bug Fixes

* update `ts-jest` to `22.4.1` – urgent fix for `enableTsDiagnostics` ([#130](https://github.com/thymikee/jest-preset-angular/pull/130))


### Chores

* Change `testRegex` to `testMatch` ([#131](https://github.com/thymikee/jest-preset-angular/pull/131))



# [5.2.0](https://github.com/thymikee/jest-preset-angular/compare/v5.1.0...v5.2.0) (2018-02-26)


### Chores

* Upgrade ts-jest and remove `mapCoverage` from `jest-preset` (requires `jest@^22.4.0` as a dependency now) ([#127](https://github.com/thymikee/jest-preset-angular/pull/127))



# [5.1.0](https://github.com/thymikee/jest-preset-angular/compare/v5.0.0...v5.1.0) (2018-02-22)


### Features

* Simplify installation by adding @types/jest as a package dependency ([#116](https://github.com/thymikee/jest-preset-angular/pull/116))
* Move serializers setup to jest config to be possible to override them ([#126](https://github.com/thymikee/jest-preset-angular/pull/126))


### Chores

* **docs:** Add a configuration section with vendor libraries like jQuery ([#117](https://github.com/thymikee/jest-preset-angular/pull/117))

# [5.0.0](https://github.com/thymikee/jest-preset-angular/compare/v4.0.2...v5.0.0) (2017-12-21)


### Chores

* Get rid of explicit `jsdom` dependency and custom test environment


### BREAKING CHANGES

* Upgrade Jest to 22 ([#109](https://github.com/thymikee/jest-preset-angular/pull/109))
* Upgrade `ts-jest` to 22 ([#109](https://github.com/thymikee/jest-preset-angular/pull/109))



## [4.0.2](https://github.com/thymikee/jest-preset-angular/compare/v4.0.0...v4.0.2) (2017-12-11)


### BREAKING CHANGES

* Change to MIT license ([#102](https://github.com/thymikee/jest-preset-angular/pull/102))



# [4.0.1](https://github.com/thymikee/jest-preset-angular/compare/v4.0.0...v4.0.1) (2017-10-08)


### Bug Fixes

* Add doctype to test envrionment ([#78](https://github.com/thymikee/jest-preset-angular/pull/78))



# [4.0.0](https://github.com/thymikee/jest-preset-angular/compare/v4.0.0-alpha.1...v4.0.0) (2017-10-03)


### Bug Fixes

* `fakeAsync` not working with `zone.js` >= 0.8.11


### Features

* Custom test environment with newest version of `jsdom` ([#75](https://github.com/thymikee/jest-preset-angular/pull/75))
* Use universal `zone.js` instead of node-specific one ([#76](https://github.com/thymikee/jest-preset-angular/pull/76))


### BREAKING CHANGES

* Drop Node 4 support (because of `jsdom` upgrade



## [3.0.2](https://github.com/thymikee/jest-preset-angular/compare/v3.0.0...v3.0.2) (2017-09-21)


### Bug Fixes

* issues with `moduleNameMapper` not overriding mappings ([#53](https://github.com/thymikee/jest-preset-angular/pull/53))


### BREAKING CHANGES

* Upgrade `jest` to 21
* Upgrade `ts-jest` to 21
* `moduleNameMapper` no longer maps absolute paths to `src` by default, you need to declare the mappings explicitly ([#53](https://github.com/thymikee/jest-preset-angular/pull/53))



## [2.0.5](https://github.com/thymikee/jest-preset-angular/compare/v2.0.4...v2.0.5) (2017-07-07)


### Bug Fixes

* Bump to `ts-jest` 20.0.7



## [2.0.4](https://github.com/thymikee/jest-preset-angular/compare/v2.0.3...v2.0.4) (2017-06-13)


### Bug Fixes

* Angular injection errors are now visible
* scape template literals special chars ([#34](https://github.com/thymikee/jest-preset-angular/pull/34))



# [2.0.0](https://github.com/thymikee/jest-preset-angular/compare/v1.2.1...v2.0.0) (2017-05-07)


### BREAKING CHANGES

* Upgrade to Jest 20
* Better snapshot rendering



# [1.2.0](https://github.com/thymikee/jest-preset-angular/compare/v1.1.3...v1.2.0) (2017-04-29)


### Features

* Support absolute URLs in `templateUrl`



# [1.1.0](https://github.com/thymikee/jest-preset-angular/compare/v1.0.0...v1.1.0) (2017-04-22)


### Features

* Support snapshot testing ([#24](https://github.com/thymikee/jest-preset-angular/pull/24))



# [1.0.0](https://github.com/thymikee/jest-preset-angular/compare/v1.0.0-alpha...v1.0.0) (2017-04-13)


### BREAKING CHANGES

* `rxjs` is no longer auto included ([#18](https://github.com/thymikee/jest-preset-angular/pull/18))



## [0.0.14](https://github.com/thymikee/jest-preset-angular/compare/v0.0.13...v0.0.14) (2017-04-12)


### Bug Fixes

* Bump `jest-zone-patch` version with `zone.js` peer dependency



## [0.0.13](https://github.com/thymikee/jest-preset-angular/compare/v0.0.12...v0.0.13) (2017-04-05)


### Bug Fixes

* Overhaul regex for styleUrls ([#10](https://github.com/thymikee/jest-preset-angular/pull/10))



## [0.0.10](https://github.com/thymikee/jest-preset-angular/compare/v0.0.9...v0.0.10) (2017-04-04)


### Bug Fixes

* Improve global mocks



## [0.0.9](https://github.com/thymikee/jest-preset-angular/compare/v0.0.8...v0.0.9) (2017-04-04)


### Features

* Allow all folders within src for module resolution ([#6](https://github.com/thymikee/jest-preset-angular/pull/6))



## [0.0.8](https://github.com/thymikee/jest-preset-angular/compare/v0.0.5...v0.0.8) (2017-04-04)


### Bug Fixes

* Use `tsconfig.spec.json` instead of `tsconfig.app.json` as TS configuration for tests



## 0.0.1 (2017-03-30)
