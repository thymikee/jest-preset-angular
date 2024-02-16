## [14.0.3](https://github.com/thymikee/jest-preset-angular/compare/v14.0.2...v14.0.3) (2024-02-16)


### Features

* support signal queries in Angular 17.2 ([a57ad7d](https://github.com/thymikee/jest-preset-angular/commit/a57ad7dcdd1d1d70fb4cc61c9a52dd1b3008ce82))



## [14.0.2](https://github.com/thymikee/jest-preset-angular/compare/v14.0.1...v14.0.2) (2024-02-11)


### Performance Improvements

* reduce package size and speed up execution ([d7cbbac](https://github.com/thymikee/jest-preset-angular/commit/d7cbbace9bdaca69114a959d89f0a0c466db4092))



## [14.0.1](https://github.com/thymikee/jest-preset-angular/compare/v14.0.0...v14.0.1) (2024-02-09)


### Features

* remove esbuild-check workaround ([2e0fa38](https://github.com/thymikee/jest-preset-angular/commit/2e0fa38bbcbca1a2db326687284cffe912d7ebdd))
* set version for `esbuild` to be version from Angular 15.x.x ([af38578](https://github.com/thymikee/jest-preset-angular/commit/af3857885365a182b88f003e4592cceee5af849c))
* support signal inputs, queries and model ([#2303](https://github.com/thymikee/jest-preset-angular/issues/2303)) ([7f7a22f](https://github.com/thymikee/jest-preset-angular/commit/7f7a22f3ab4068a7574f64e37f819a0eff3e86c3)), closes [#2246](https://github.com/thymikee/jest-preset-angular/issues/2246) [#2255](https://github.com/thymikee/jest-preset-angular/issues/2255)



# [14.0.0](https://github.com/thymikee/jest-preset-angular/compare/v13.1.6...v14.0.0) (2024-01-11)


## BREAKING CHANGES

* Drop support for Angular 13, 14 ([a3091b5](https://github.com/thymikee/jest-preset-angular/commit/a3091b54cdf9c204226085ceeb565cddbb7425d0))



## [13.1.6](https://github.com/thymikee/jest-preset-angular/compare/v13.1.5...v13.1.6) (2024-01-11)


### Bug Fixes

* revert drop support Angular 13, 14 ([#2214](https://github.com/thymikee/jest-preset-angular/issues/2214)) ([9ed9354](https://github.com/thymikee/jest-preset-angular/commit/9ed93548ce1a03528cd0343a1b08f98b7939e91c)), closes [#2213](https://github.com/thymikee/jest-preset-angular/issues/2213)



## [13.1.5](https://github.com/thymikee/jest-preset-angular/compare/v13.1.3...v13.1.5) (2024-01-03)


### Bug Fixes

* Fix TS5 + ESM hang ([#2197](https://github.com/thymikee/jest-preset-angular/issues/2197)) ([90797e5](https://github.com/thymikee/jest-preset-angular/commit/90797e511f7ba511a653a88002ae28fed4bbbca1)), closes  [#2138](https://github.com/thymikee/jest-preset-angular/issues/2138) [#2196](https://github.com/thymikee/jest-preset-angular/issues/2196)



## [13.1.4](https://github.com/thymikee/jest-preset-angular/compare/v13.1.3...v13.1.4) (2023-11-11)


### Bug Fixes

* **transformers:** handle single string styles or styleUrl property ([#2186](https://github.com/thymikee/jest-preset-angular/issues/2186)) ([0c99aae](https://github.com/thymikee/jest-preset-angular/commit/0c99aae402c8c7edbef8b1c64d2a7e41a76a6b60))



## [13.1.3](https://github.com/thymikee/jest-preset-angular/compare/v13.1.2...v13.1.3) (2023-11-06)


### Features

* **deps:** extend version support range to Angular 17 ([#2179](https://github.com/thymikee/jest-preset-angular/issues/2179)) ([5434e22](https://github.com/thymikee/jest-preset-angular/commit/5434e2216013cbd9c750e644b9fd78216c9cdee3))



## [13.1.2](https://github.com/thymikee/jest-preset-angular/compare/v13.1.1...v13.1.2) (2023-09-19)


### Code Refactoring

* refactor import `zone.js/testing` instead of `zone-testing-bundle` ([#2163](https://github.com/thymikee/jest-preset-angular/issues/2163)) ([5128ecb](https://github.com/thymikee/jest-preset-angular/commit/e47ae67f86749d872953d2fc1221e2d9c5128ecb)), closes [#2162](https://github.com/thymikee/jest-preset-angular/issues/2162)



## [13.1.1](https://github.com/thymikee/jest-preset-angular/compare/v13.1.0...v13.1.1) (2023-05-14)


### Bug Fixes

* file separator issue on Windows causing error in `ngcc-jest-processor` ([#2079](https://github.com/thymikee/jest-preset-angular/issues/2079)) ([b6b3911](https://github.com/thymikee/jest-preset-angular/commit/b6b391155204120f31dc5538fee554c93b10d001))



# [13.1.0](https://github.com/thymikee/jest-preset-angular/compare/v13.0.1...v13.1.0) (2023-05-06)


### Features

* bump peer deps to support angular 16 ([#2061](https://github.com/thymikee/jest-preset-angular/issues/2061)) ([18abd21](https://github.com/thymikee/jest-preset-angular/commit/18abd21fc63f4c3669878ed74f5a380852c4c193))
* **utils:** skip ngcc processing in ng16 or higher ([#2063](https://github.com/thymikee/jest-preset-angular/issues/2063)) ([2661988](https://github.com/thymikee/jest-preset-angular/commit/266198863242804e0cd79c83f151247194b37b06))



## [13.0.1](https://github.com/thymikee/jest-preset-angular/compare/v13.0.0...v13.0.1) (2023-03-21)


### Bug Fixes

* **serializer:** replace `ɵivyEnabled` with workaround to detect Ivy mode  ([#2016](https://github.com/thymikee/jest-preset-angular/issues/2016)) ([44d3922](https://github.com/thymikee/jest-preset-angular/commit/44d3922632b4f513d43d5b92a176554ecafb1de1)), closes [#2003](https://github.com/thymikee/jest-preset-angular/issues/2003)



# [13.0.0](https://github.com/thymikee/jest-preset-angular/compare/v13.0.0-next.1...v13.0.0) (2023-02-18)


### Bug Fixes

* add `jest-util` to list of `dependencies` ([#1777](https://github.com/thymikee/jest-preset-angular/issues/1777)) ([db8f7c9](https://github.com/thymikee/jest-preset-angular/commit/db8f7c90a5c2395ac7b6b24be9baf56331a57198)), closes [#1773](https://github.com/thymikee/jest-preset-angular/issues/1773)
* typo in `esbuild-check.js` ([#1806](https://github.com/thymikee/jest-preset-angular/issues/1806)) ([c2f2b61](https://github.com/thymikee/jest-preset-angular/commit/c2f2b611e8893b04904907e8255cd6a4b28dddf9))


### Features

* support Jest 29 ([#1937](https://github.com/thymikee/jest-preset-angular/issues/1937)) ([b0b57a7](https://github.com/thymikee/jest-preset-angular/commit/b0b57a7df09fe3d84baccdc4f032ffbb9235bb69)), closes [#1774](https://github.com/thymikee/jest-preset-angular/issues/1774)
* **config:** remove hardcoded logic setting `target` to `ES2015` ([#1788](https://github.com/thymikee/jest-preset-angular/issues/1788)) ([695c730](https://github.com/thymikee/jest-preset-angular/commit/695c73022c4011cca477b8d6d62c174a8c01a9ec))
* remove `destroyAfterEach` and `teardown` options ([#1768](https://github.com/thymikee/jest-preset-angular/issues/1768)) ([fe4c73b](https://github.com/thymikee/jest-preset-angular/commit/fe4c73b68536188fa6c89a35e60504bd7e7515df))


## BREAKING CHANGES

* Drop support for Angular 11, 12
* Jest 29 is required
* `destroyAfterEach` and `teardown` are no longer available to use, please use `testEnvironmentOptions` instead.
* `target` is `tsconfig` is now respected according to user configuration, it is no longer hardcoded at `ES2015`. See also note at https://thymikee.github.io/jest-preset-angular/docs/getting-started/installation



# [13.0.0-next.1](https://github.com/thymikee/jest-preset-angular/compare/v13.0.0-next.0...v13.0.0-next.1) (2023-01-27)


### Features

* support Jest 29 ([#1937](https://github.com/thymikee/jest-preset-angular/issues/1937)) ([b0b57a7](https://github.com/thymikee/jest-preset-angular/commit/b0b57a7df09fe3d84baccdc4f032ffbb9235bb69)), closes [#1774](https://github.com/thymikee/jest-preset-angular/issues/1774)



# [13.0.0-next.0](https://github.com/thymikee/jest-preset-angular/compare/v12.2.2...v13.0.0-next.0) (2023-01-26)


### Bug Fixes

* add `jest-util` to list of `dependencies` ([#1777](https://github.com/thymikee/jest-preset-angular/issues/1777)) ([db8f7c9](https://github.com/thymikee/jest-preset-angular/commit/db8f7c90a5c2395ac7b6b24be9baf56331a57198)), closes [#1773](https://github.com/thymikee/jest-preset-angular/issues/1773)
* typo in `esbuild-check.js` ([#1806](https://github.com/thymikee/jest-preset-angular/issues/1806)) ([c2f2b61](https://github.com/thymikee/jest-preset-angular/commit/c2f2b611e8893b04904907e8255cd6a4b28dddf9))


### Features

* **config:** remove hardcoded logic setting `target` to `ES2015` ([#1788](https://github.com/thymikee/jest-preset-angular/issues/1788)) ([695c730](https://github.com/thymikee/jest-preset-angular/commit/695c73022c4011cca477b8d6d62c174a8c01a9ec))
* drop support for Angular 11 ([#1767](https://github.com/thymikee/jest-preset-angular/issues/1767)) ([22f2cd6](https://github.com/thymikee/jest-preset-angular/commit/22f2cd638fcafeee47f7f21169f8b52a28428caf))
* drop support for Angular 12 ([#1843](https://github.com/thymikee/jest-preset-angular/issues/1843)) ([dc58df1](https://github.com/thymikee/jest-preset-angular/commit/dc58df132e58d51b01f0bcb96dd11aa362f5e2a6))
* remove `destroyAfterEach` and `teardown` options ([#1768](https://github.com/thymikee/jest-preset-angular/issues/1768)) ([fe4c73b](https://github.com/thymikee/jest-preset-angular/commit/fe4c73b68536188fa6c89a35e60504bd7e7515df))



## [12.2.6](https://github.com/thymikee/jest-preset-angular/compare/v12.2.5...v12.2.6) (2023-01-26)


### Bug Fixes

* **serializers:** remove `__ngContext__` from snapshots ([#1816](https://github.com/thymikee/jest-preset-angular/issues/1816)) ([6997b0b](https://github.com/thymikee/jest-preset-angular/commit/6997b0bc2020e8b7d88d55a107f03c60f8ab8ee1))



## [12.2.5](https://github.com/thymikee/jest-preset-angular/compare/v12.2.4...v12.2.5) (2023-01-18)


### Bug Fixes

* Fix support for Angular 12 caused by the fix with downlevel-ctor transformer from https://github.com/angular/angular/pull/48638



## [12.2.4](https://github.com/thymikee/jest-preset-angular/compare/v12.2.3...v12.2.4) (2023-01-16)


### Bug Fixes

* support TypeScript 4.2 for Angular 12 ([8b59e79](https://github.com/thymikee/jest-preset-angular/commit/8b59e798b565679a26945d95e0539685cfc62a3c))
* Including Angular fix for downlevel-ctor transformer, see https://github.com/angular/angular/pull/48638



## [12.2.3](https://github.com/thymikee/jest-preset-angular/compare/v12.2.2...v12.2.3) (2022-11-26)


### Features

* support Angular 15 ([b2cc6df](https://github.com/thymikee/jest-preset-angular/commit/b2cc6df5cbdc7664baf365ce4f526ce0044687ef))



## [12.2.2](https://github.com/thymikee/jest-preset-angular/compare/v12.2.1...v12.2.2) (2022-08-29)


### Bug Fixes

* include `ts_compatibility/src` when publishing the package ([#1747](https://github.com/thymikee/jest-preset-angular/issues/1747)) ([26f021f](https://github.com/thymikee/jest-preset-angular/commit/26f021f65777661db83692115cb7976c656f1503)), closes [#1743](https://github.com/thymikee/jest-preset-angular/issues/1743)



## [12.2.1](https://github.com/thymikee/jest-preset-angular/compare/v12.2.0...v12.2.1) (2022-08-28)


### Bug Fixes

* **transformers:** adopt ts 4.8 changes for `replace-resource` ([#1739](https://github.com/thymikee/jest-preset-angular/issues/1739)) ([aea7205](https://github.com/thymikee/jest-preset-angular/commit/aea7205afb9622f2ba09a032505b8dbf5c7105c1)), closes [#1732](https://github.com/thymikee/jest-preset-angular/issues/1732)



# [12.2.0](https://github.com/thymikee/jest-preset-angular/compare/v12.1.0...v12.2.0) (2022-07-14)


### Bug Fixes

* add esbuild check to fallback to WASM if needed ([#1619](https://github.com/thymikee/jest-preset-angular/issues/1619)) ([1ece767](https://github.com/thymikee/jest-preset-angular/commit/1ece7674231f5c422df4d2cae12ce3920a7346b9))


### Features

* add `global-setup.mjs` to use with Jest ESM mode ([#1661](https://github.com/thymikee/jest-preset-angular/issues/1661)) ([97a0ec8](https://github.com/thymikee/jest-preset-angular/commit/97a0ec8e0303b9c3014fce1ae8bdebbb07c32455))
* allow configuring options `TestEnvironmentOptions` for setup test env ([#1657](https://github.com/thymikee/jest-preset-angular/issues/1657)) ([a64a4ac](https://github.com/thymikee/jest-preset-angular/commit/a64a4acb1248962e023165eb538e2f4f9954fbaa)), closes [#1656](https://github.com/thymikee/jest-preset-angular/issues/1656)



# [12.1.0](https://github.com/thymikee/jest-preset-angular/compare/v12.0.1...v12.1.0) (2022-06-03)


### Features

* allow passing the `teardown` object to `global-setup` ([#1475](https://github.com/thymikee/jest-preset-angular/issues/1475)) ([3dab02b](https://github.com/thymikee/jest-preset-angular/commit/3dab02b91146379fba7430f9a2ad38b9aa95b37c))
* support Angular 14 ([#1611](https://github.com/thymikee/jest-preset-angular/issues/1611)) ([7c294d7](https://github.com/thymikee/jest-preset-angular/commit/7c294d7de2c898e5ac3520ce2b27567c91a189c9)), closes [#1410](https://github.com/thymikee/jest-preset-angular/issues/1410)



## [12.0.1](https://github.com/thymikee/jest-preset-angular/compare/v12.0.0...v12.0.1) (2022-05-14)


### Features

* allow configuring `destroyAfterEach` via `globalThis` for setup test env ([#1469](https://github.com/thymikee/jest-preset-angular/issues/1469)) ([9a735f9](https://github.com/thymikee/jest-preset-angular/commit/9a735f9670a1d55743d3dad6abdc0473c22f2cf6)), closes [#1466](https://github.com/thymikee/jest-preset-angular/issues/1466)



# [12.0.0](https://github.com/thymikee/jest-preset-angular/compare/v12.0.0-next.2...v12.0.0) (2022-05-10)


### Bug Fixes

* add missing `jest` and `typescript` to peer deps ([#1442](https://github.com/thymikee/jest-preset-angular/issues/1442)) ([6a652af](https://github.com/thymikee/jest-preset-angular/commit/6a652afbe893e344c2d4ed2f00528ab80ed52760)), closes [#1441](https://github.com/thymikee/jest-preset-angular/issues/1441)
* set range supported version for Angular peer deps ([#1449](https://github.com/thymikee/jest-preset-angular/issues/1449)) ([f3e97d7](https://github.com/thymikee/jest-preset-angular/commit/f3e97d7be377a8099fa183b9e6de00a84786e471))


### Features

* **config:** add `setup-jest.mjs` for ESM mode ([#1463](https://github.com/thymikee/jest-preset-angular/issues/1463)) ([cc6ce3f](https://github.com/thymikee/jest-preset-angular/commit/cc6ce3fd92d00d8b5d71bec535ce2d625a4cc48c))
* add an option to configure which file processed by `esbuild` ([#1455](https://github.com/thymikee/jest-preset-angular/issues/1455)) ([b58d089](https://github.com/thymikee/jest-preset-angular/commit/b58d089c255a600707a35cabcfa62fb413f8153b)), closes [#1413](https://github.com/thymikee/jest-preset-angular/issues/1413) [#1437](https://github.com/thymikee/jest-preset-angular/issues/1437)
* drop support Node 12 ([04195d5](https://github.com/thymikee/jest-preset-angular/commit/04195d5326e370e76e6f76d1e2c9cf277cf975a0))
* exclude `ng-jest-resolver` from default/esm presets ([#1440](https://github.com/thymikee/jest-preset-angular/issues/1440)) ([56673c4](https://github.com/thymikee/jest-preset-angular/commit/56673c4c086e6a4bf8fada5c196c5a50481b04f0))
* remove `reflect-metadata` in `setup-jest` ([#1428](https://github.com/thymikee/jest-preset-angular/issues/1428)) ([5a36729](https://github.com/thymikee/jest-preset-angular/commit/5a367293ba490d7d717963b099db7531c347d1f4))
* remove `zone-patch` and its fallback ([#1427](https://github.com/thymikee/jest-preset-angular/issues/1427)) ([bf9ea44](https://github.com/thymikee/jest-preset-angular/commit/bf9ea44a643311f3bbfbcbc67b493aa000336bee))
* allow running `ngcc` with specific `tsconfig` path ([#1418](https://github.com/thymikee/jest-preset-angular/issues/1418)) ([5f535b5](https://github.com/thymikee/jest-preset-angular/commit/5f535b59227daea6e64e4886b0ea0bd5fd7c1365)), closes [#1348](https://github.com/thymikee/jest-preset-angular/issues/1348)
* allow skip `ngcc` via `skipNgcc` option via `globalThis` ([#1417](https://github.com/thymikee/jest-preset-angular/issues/1417)) ([7950b5c](https://github.com/thymikee/jest-preset-angular/commit/7950b5cedfab066a268b16f5c87b5ad3670c6888)), closes [#1396](https://github.com/thymikee/jest-preset-angular/issues/1396)
* remove `ngcc-jest-processor` entry file ([#1414](https://github.com/thymikee/jest-preset-angular/issues/1414)) ([2c5fd20](https://github.com/thymikee/jest-preset-angular/commit/2c5fd20f0535f5441d8bcb477538defdd9529926))


## BREAKING CHANGES

* Since **Angular 11**, the minimum version of `zone.js` is **0.11.x** and Angular 10 is EOL, so now we can use zone patch directly from `zone.js`. 
If one is not using `zone.js@0.11.x`, please upgrade.
* Now we are using Angular AST transformers, `reflect-metadata` is not needed anymore.
* **Jest 28** correctly resolves Angular package format files so the `ng-jest-resolver` is now optional.
* **Node 12** is no longer support
* Previously, we always checked file extension `.mjs` and any files from `node_modules` excluding `tslib` to be processed with `esbuild`. 
With the new option `processWithEsbuild`, now we put default all `.mjs` files to be processed by `esbuild`. Files like `lodash-es` default isn't processed by `esbuild`. 
If you wish to use `esbuild` to process such files, please configure in your Jest config like
```
// jest.config.js
module.exports = {
    //...
    globals: {
         ngJest: {
              processWithEsbuild: ['**/node_modules/lodash-es/*.js],
         }
    }
}
```
* **Angular 10** is no longer support
* Require **Jest 28**
* `ngcc-jest-processor` entry file is now removed. One should use `jest-preset-angular/global-setup` instead.



## [11.1.2](https://github.com/thymikee/jest-preset-angular/compare/v11.1.1...v11.1.2) (2022-04-24)


### Bug Fixes

* correct deprecation message of `ngcc-jest-processor` ([3899abf](https://github.com/thymikee/jest-preset-angular/commit/3899abf5b886826a00d443db364d7b1fb085122b)), closes [#1411](https://github.com/thymikee/jest-preset-angular/issues/1411)



## [11.1.1](https://github.com/thymikee/jest-preset-angular/compare/v11.0.1...v11.1.1) (2022-02-11)


### Performance Improvements

* **transformer:** cache checking `esbuild` result ([#1309](https://github.com/thymikee/jest-preset-angular/issues/1309)) ([3412142](https://github.com/thymikee/jest-preset-angular/commit/341214213786899e2b6722c8c97dcbc0cca5252c))
* **transformer:** leverage the `ts-jest` config set cache ([#1318](https://github.com/thymikee/jest-preset-angular/issues/1318)) ([d47d1eb](https://github.com/thymikee/jest-preset-angular/commit/d47d1ebdb9248f722408431eba0b061c82dbc127)), closes [#1311](https://github.com/thymikee/jest-preset-angular/issues/1311)



# [11.1.0](https://github.com/thymikee/jest-preset-angular/compare/v11.0.1...v11.1.0) (2022-01-20)


### Bug Fixes

* apply similar fallback as Angular for `esbuild` ([#1283](https://github.com/thymikee/jest-preset-angular/issues/1283)) ([af528e6](https://github.com/thymikee/jest-preset-angular/commit/af528e6003c72ca1affb5ec8d6747c9ea62ae10a)), closes [#1255](https://github.com/thymikee/jest-preset-angular/issues/1255)


### DEPRECATIONS

* `ngcc-jest-processor` is deprecated in favor of `globalSetup` file ([#1275](https://github.com/thymikee/jest-preset-angular/issues/1275)) ([75e7368](https://github.com/thymikee/jest-preset-angular/commit/75e73682554c38cc39e3b08807cf19d97c94d8f9))



## [11.0.1](https://github.com/thymikee/jest-preset-angular/compare/v11.0.0...v11.0.1) (2021-11-22)


### Bug Fixes

* add `bs-logger` as a direct dependency ([#1192](https://github.com/thymikee/jest-preset-angular/issues/1192)) ([c7f6550](https://github.com/thymikee/jest-preset-angular/commit/c7f65501e7b9acf2d0568f91fbd4979a7e2913b1)), closes [#1191](https://github.com/thymikee/jest-preset-angular/issues/1191)



# [11.0.0](https://github.com/thymikee/jest-preset-angular/compare/v11.0.0-rc.4...v11.0.0) (2021-11-18)


### Bug Fixes

* **presets:** use `ts-jest` types for preset types ([#1172](https://github.com/thymikee/jest-preset-angular/issues/1172)) ([81854f6](https://github.com/thymikee/jest-preset-angular/commit/81854f680088f23f4f2f5801ef660711812b90e3))
* **presets:** add `mjs` to the list of `moduleFileExtensions` ([#1155](https://github.com/thymikee/jest-preset-angular/issues/1155)) ([3c992a1](https://github.com/thymikee/jest-preset-angular/commit/3c992a18b209f9d6500e34255b8f74c7fc5f3560)), closes [#1147](https://github.com/thymikee/jest-preset-angular/issues/1147)


### Features

* support Angular 13 in CJS mode ([#1122](https://github.com/thymikee/jest-preset-angular/issues/1122)) ([12d3c6d](https://github.com/thymikee/jest-preset-angular/commit/12d3c6d27fadc3c423ab42d10615526e26826ed6))


### Code Refactoring

* **presets**: improve `transformIgnorePatterns` value ([#1162](https://github.com/thymikee/jest-preset-angular/issues/1162)) ([99a4b1b1](https://github.com/thymikee/jest-preset-angular/commit/99a4b1b1549a13b27bd8d03df181ea6fa69aa073))


### Performance Improvements

* process `js` files in `node_modules` with `esbuild` ([#1169](https://github.com/thymikee/jest-preset-angular/issues/1169)) ([1de3bf0](https://github.com/thymikee/jest-preset-angular/commit/1de3bf04886fbc91ab821e965ec94a2d8dc741be))
* use `esbuild` to process `.mjs` files ([#1142](https://github.com/thymikee/jest-preset-angular/issues/1142)) ([5d3fe10](https://github.com/thymikee/jest-preset-angular/commit/5d3fe1010592b7a3973cdbc22c238e0e46d47b45)), closes [#1141](https://github.com/thymikee/jest-preset-angular/issues/1141)


## BREAKING CHANGES

* `js` files from `node_modules` are now compiled with `esbuild` to improve performance.
* **NodeJs** range version support now is `^12.20.0 || ^14.15.0 || >=16.10.0`
* Due to the introduction of **ESM package format** for Angular packages, several things are added to the **default preset**
  to handle `.mjs` files from **Angular ESM packages**. Please check our migration documentation at https://thymikee.github.io/jest-preset-angular/docs/next/guides/angular-13+


### Special Thanks

Alan Agius, Pete Bacon Darwin from Angular team



# [11.0.0-rc.4](https://github.com/thymikee/jest-preset-angular/compare/v11.0.0-rc.3...v11.0.0-rc.4) (2021-11-15)


### Performance Improvements

* process `js` files in `node_modules` with `esbuild` ([#1169](https://github.com/thymikee/jest-preset-angular/issues/1169)) ([1de3bf0](https://github.com/thymikee/jest-preset-angular/commit/1de3bf04886fbc91ab821e965ec94a2d8dc741be))


### Code Refactoring

* **presets**: improve `transformIgnorePatterns` value ([#1162](https://github.com/thymikee/jest-preset-angular/issues/1162)) ([99a4b1b1](https://github.com/thymikee/jest-preset-angular/commit/99a4b1b1549a13b27bd8d03df181ea6fa69aa073))


## BREAKING CHANGES

* `js` files from `node_modules` are now compiled with `esbuild` to improve performance.



# [11.0.0-rc.3](https://github.com/thymikee/jest-preset-angular/compare/v11.0.0-rc.2...v11.0.0-rc.3) (2021-11-09)


### Bug Fixes

* **presets:** add `mjs` to the list of `moduleFileExtensions` ([#1155](https://github.com/thymikee/jest-preset-angular/issues/1155)) ([3c992a1](https://github.com/thymikee/jest-preset-angular/commit/3c992a18b209f9d6500e34255b8f74c7fc5f3560)), closes [#1147](https://github.com/thymikee/jest-preset-angular/issues/1147)
* bring back checks on `undefined`/`null` for `no-ng-attributes` ([#1154](https://github.com/thymikee/jest-preset-angular/issues/1154)) ([1e7dbf8](https://github.com/thymikee/jest-preset-angular/commit/1e7dbf8432d2c25a9a3d1e650db2abc3fa6a0466))
* **serializers:** revert partially changes in `ng-snapshot` ([#1150](https://github.com/thymikee/jest-preset-angular/issues/1150)) ([44b3b77](https://github.com/thymikee/jest-preset-angular/commit/44b3b773b99f29eabc4d683509de39bdd68796ce)), closes [#1148](https://github.com/thymikee/jest-preset-angular/issues/1148)



# [11.0.0-rc.2](https://github.com/thymikee/jest-preset-angular/compare/v11.0.0-rc.1...v11.0.0-rc.2) (2021-11-08)


### Performance Improvements

* use `esbuild` to process `.mjs` files ([#1142](https://github.com/thymikee/jest-preset-angular/issues/1142)) ([5d3fe10](https://github.com/thymikee/jest-preset-angular/commit/5d3fe1010592b7a3973cdbc22c238e0e46d47b45)), closes [#1141](https://github.com/thymikee/jest-preset-angular/issues/1141)



# [11.0.0-rc.1](https://github.com/thymikee/jest-preset-angular/compare/v11.0.0-rc.0...v11.0.0-rc.1) (2021-11-04)


### Bug Fixes

* allow `reflection/src` to be in published content ([#1135](https://github.com/thymikee/jest-preset-angular/issues/1135)) ([d079ac0](https://github.com/thymikee/jest-preset-angular/commit/d079ac08a58057d9e6a4591e392da9596a4c30be)), closes [#1133](https://github.com/thymikee/jest-preset-angular/issues/1133)



# [11.0.0-rc.0](https://github.com/thymikee/jest-preset-angular/compare/v10.0.1...v11.0.0-rc.0) (2021-11-04)


### Features

* support Angular 13 in CJS mode ([#1122](https://github.com/thymikee/jest-preset-angular/issues/1122)) ([12d3c6d](https://github.com/thymikee/jest-preset-angular/commit/12d3c6d27fadc3c423ab42d10615526e26826ed6))


## BREAKING CHANGES

* **NodeJs** range version support now is `^12.20.0 || ^14.15.0 || >=16.10.0`
* Due to the introduction of **ESM package format** for Angular packages, several things are added to the **default preset** 
to handle `.mjs` files from **Angular ESM packages**. Please check our migration documentation at https://thymikee.github.io/jest-preset-angular/docs/next/guides/angular-13+


### Special Thanks

Alan Agius, Pete Bacon Darwin from Angular team



## [10.1.0](https://github.com/thymikee/jest-preset-angular/compare/v10.0.1...v10.1.0) (2021-10-26)


### Bug Fixes

* **config:** set tsconfig `target` to ES2015 when `target` > ES2016 ([#1118](https://github.com/thymikee/jest-preset-angular/issues/1118)) ([64229a8](https://github.com/thymikee/jest-preset-angular/commit/64229a80f7a4833263e99950a42e8a618745115f)), closes [#1058](https://github.com/thymikee/jest-preset-angular/issues/1058)


### Code Refactoring

* **transformers** use Angular `downlevel-ctor` transformer ([#1099](https://github.com/thymikee/jest-preset-angular/issues/1099)) ([3c26aba](https://github.com/thymikee/jest-preset-angular/commit/3c26abacf3a2f841330a7bc34aed172111c1e334))
* **transformers** remove workaround for ts < 4.0 in `replace-resource` transformer ([#1100](https://github.com/thymikee/jest-preset-angular/issues/1100)) ([ce68298](https://github.com/thymikee/jest-preset-angular/commit/ce682983bf4212a1f6fd71349af0d06c520812d6))
* **transformers** migrate `html-comment` to new Jest serializer ([#1114](https://github.com/thymikee/jest-preset-angular/issues/1114)) ([3005330](https://github.com/thymikee/jest-preset-angular/commit/3005330034f5db5d943764d406256f6c06d72823))



## [10.0.1](https://github.com/thymikee/jest-preset-angular/compare/10.0.0...10.0.1) (2021-09-27)


### Bug Fixes

* **utils:** allow skipping `ngcc-jest-processor` via some Jest args ([#1013](https://github.com/thymikee/jest-preset-angular/issues/1013)) ([7d3a712](https://github.com/thymikee/jest-preset-angular/commit/7d3a712a05ca3d032f942e59ba7d2b6f5f096334))



# [10.0.0](https://github.com/thymikee/jest-preset-angular/compare/v9.0.7...v10.0.0) (2021-09-16)


### Build

* drop support for Angular 9 ([#998](https://github.com/thymikee/jest-preset-angular/issues/998)) ([1bbcc01](https://github.com/thymikee/jest-preset-angular/commit/1bbcc01ed4c098cd30871162a5e82fac4819a2d0))


## BREAKING CHANGES

Angular 9 is no longer supported, see https://angular.io/guide/releases#support-policy-and-schedule The minimum support Angular version now is 10



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
