require('zone.js/bundles/zone-testing-bundle.umd');
const { getTestBed } = require('@angular/core/testing');
const {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} = require('@angular/platform-browser-dynamic/testing');

const testEnvironmentOptions = globalThis.ngJest?.testEnvironmentOptions ?? Object.create(null);

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), testEnvironmentOptions);
