## Changelog (master)

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
* Breaking: Upgrade jest to 21
* Breaking: Upgrade ts-jest to 21
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
