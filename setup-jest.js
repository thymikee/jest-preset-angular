require('zone.js/bundles/zone-testing-bundle.umd');
const { getTestBed } = require('@angular/core/testing');
const {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} = require('@angular/platform-browser-dynamic/testing');

const configuredDestroyAfterEach = globalThis.ngJest?.destroyAfterEach;
if (configuredDestroyAfterEach !== undefined) {
  getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: {
      destroyAfterEach: configuredDestroyAfterEach,
    },
  });
} else {
  getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
}
