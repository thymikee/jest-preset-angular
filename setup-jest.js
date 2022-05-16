require('zone.js/bundles/zone-testing-bundle.umd');
const { getTestBed } = require('@angular/core/testing');
const {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} = require('@angular/platform-browser-dynamic/testing');

let teardown = globalThis.ngJest?.teardown;
const configuredDestroyAfterEach = globalThis.ngJest?.destroyAfterEach;
if (configuredDestroyAfterEach) {
  teardown = {
    destroyAfterEach: true,
  };
}

if (teardown !== undefined) {
  getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown,
  });
} else {
  getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
}
