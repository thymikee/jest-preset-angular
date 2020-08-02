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



