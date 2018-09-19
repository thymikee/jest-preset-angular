## Changelog (master)

### v6.0.1

* Fix: Support backtick quoted templateUrl. ([#182](https://github.com/thymikee/jest-preset-angular/pull/182))
* Fix: Restrict version of ts-jest to ~23.1.3 ([#196](https://github.com/thymikee/jest-preset-angular/pull/196))
* Chore: Add HeroesComponent example with mocked service provider ([#110](https://github.com/thymikee/jest-preset-angular/pull/110))
* Chore: Adjust troubleshooting to support configuration with Angular 6 ([#187](https://github.com/thymikee/jest-preset-angular/pull/187))
* Chore: Update dependencies for example app ([#179](https://github.com/thymikee/jest-preset-angular/pull/179))


### v6.0.0

* Chore: Upgrade `ts-jest`, `@types/jest` in dependencies to be compatible with `jest` v23. ([#173](https://github.com/thymikee/jest-preset-angular/pull/173))
* Chore: Upgrade peer dependency `jest` to be compatible with `jest` v23. ([#173](https://github.com/thymikee/jest-preset-angular/pull/173))

### v5.2.3

* Chore: Upgrade example app to Angular 6 ([#150](https://github.com/thymikee/jest-preset-angular/pull/150))
* Chore: Upgrade dependencies for the repository ([#150](https://github.com/thymikee/jest-preset-angular/pull/150))
* Fix: fix `preprocess.js` to not break on spaces before colon ([#165](https://github.com/thymikee/jest-preset-angular/pull/165))

### v5.2.2

* Fix: specify angular modules as peerDependancies ([#141](https://github.com/thymikee/jest-preset-angular/pull/141))
* Fix: update `STYLE_URLS_REGEX` to not break on multiple new lines ([#139](https://github.com/thymikee/jest-preset-angular/pull/139))
* Docs: add more troubleshooting docs ([#129](https://github.com/thymikee/jest-preset-angular/pull/129))


### v5.2.1

* Chore: Change `testRegex` to `testMatch` ([#131](https://github.com/thymikee/jest-preset-angular/pull/131))
* Fix: Update `ts-jest` to `22.4.1` – urgent fix for `enableTsDiagnostics` ([#130](https://github.com/thymikee/jest-preset-angular/pull/130))

### v5.2.0

* Chore: Upgrade ts-jest and remove `mapCoverage` from `jest-preset` (requires `jest@^22.4.0` as a dependency now) ([#127](https://github.com/thymikee/jest-preset-angular/pull/127))

### v5.1.0

* Feature: Simplify installation by adding @types/jest as a package dependency ([#116](https://github.com/thymikee/jest-preset-angular/pull/116))
* Feature: Move serializers setup to jest config to be possible to override them ([#126](https://github.com/thymikee/jest-preset-angular/pull/126))
* Chore: Upgrade example app to Angular 5.2 using Angular CLI 1.6 ([#116](https://github.com/thymikee/jest-preset-angular/pull/116))
* Docs: Add a configuration section with vendor libraries like jQuery ([#117](https://github.com/thymikee/jest-preset-angular/pull/117))

### v5.0.0

* Breaking: Upgrade Jest to 22 ([#109](https://github.com/thymikee/jest-preset-angular/pull/109))
* Breaking: Upgrade `ts-jest` to 22 ([#109](https://github.com/thymikee/jest-preset-angular/pull/109))
* Chore: Get rid of explicit `jsdom` dependency and custom test environment

### v4.0.2

* Breaking: Change to MIT license ([#102](https://github.com/thymikee/jest-preset-angular/pull/102))
* Fix: Upgrade example app to Angular 5.0.0 using Angular CLI 1.6.1 ([#101](https://github.com/thymikee/jest-preset-angular/pull/101))
* Fix: Make example app compile ([#101](https://github.com/thymikee/jest-preset-angular/pull/101))
* Chore: Update dependencies ([#101](https://github.com/thymikee/jest-preset-angular/pull/101))

### v4.0.1

* Fix: Add doctype to test envrionment ([#78](https://github.com/thymikee/jest-preset-angular/pull/78))

### v4.0.0

* Breaking: Drop Node 4 support (because of `jsdom` upgrade)
* Feature: Custom test environment with newest version of `jsdom` ([#75](https://github.com/thymikee/jest-preset-angular/pull/75))
* Feature: Use universal `zone.js` instead of node-specific one ([#76](https://github.com/thymikee/jest-preset-angular/pull/76))
* Fix: `fakeAsync` not working with `zone.js` >= 0.8.11

### v3.0.1

* Breaking: Upgrade Jest to 21
* Breaking: Upgrade `ts-jest` to 21
* Breaking: `moduleNameMapper` no longer maps absolute paths to `src` by default, you need to declare the mappings explicitly ([#53](https://github.com/thymikee/jest-preset-angular/pull/53))
* Fix: issues with `moduleNameMapper` not overriding mappings ([#53](https://github.com/thymikee/jest-preset-angular/pull/53))

### v2.0.5

* Fix: Bump to ts-jest 20.0.7

### v2.0.2

* Fix: Angular injection errors are now visible
* Fix: Escape template literals special chars ([#34](https://github.com/thymikee/jest-preset-angular/pull/34))

### v2.0.0

* Breaking: Upgrade to Jest 20
* Breaking: Better snapshot rendering

### v1.2.0

* Feature: Support absolute URLs in `templateUrl`

### v1.1.0

* Feature: Support snapshot testing ([#24](https://github.com/thymikee/jest-preset-angular/pull/24))

### v1.0.0

* Breaking change: `rxjs` is no longer auto included ([#18](https://github.com/thymikee/jest-preset-angular/pull/18))

### v0.1.0

* Fix: Coverage support ([#15](https://github.com/thymikee/jest-preset-angular/pull/15))
* Adjustment: Add `json` as a valid module extension ([#16](https://github.com/thymikee/jest-preset-angular/pull/16))

### v0.0.14

* Fix: Bump `jest-zone-patch` version with `zone.js` peer dependency

### v0.0.13

* Fix: Overhaul regex for styleUrls ([#10](https://github.com/thymikee/jest-preset-angular/pull/10))

### v0.0.10

* Fix: Improve global mocks

### v0.0.9

* Feature: Allow all folders within src for module resolution ([#6](https://github.com/thymikee/jest-preset-angular/pull/6))

### v0.0.8

* Fix: use `tsconfig.spec.json` instead of `tsconfig.app.json` as TS configuration for tests
