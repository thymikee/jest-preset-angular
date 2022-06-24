require('zone.js/bundles/zone-testing-bundle.umd');
const { getTestBed } = require('@angular/core/testing');
const {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} = require('@angular/platform-browser-dynamic/testing');

let testEnvironmentOptions = globalThis.ngJest?.testEnvironmentOptions ?? Object.create(null);

const configuredDestroyAfterEach = globalThis.ngJest?.destroyAfterEach;
if (configuredDestroyAfterEach) {
  console.warn(
    'Passing destroyAfterEach for configuring the test environment has been deprecated.' +
      ' Please pass a `testEnvironmentOptions` object with TestEnvironmentOptions interface instead,' +
      ' see https://angular.io/api/core/testing/TestEnvironmentOptions'
  );

  testEnvironmentOptions = {
    ...testEnvironmentOptions,
    teardown: {
      destroyAfterEach: true,
    },
  };
}

const configuredTeardown = globalThis.ngJest?.teardown;
if (configuredTeardown) {
  console.warn(
    'Passing teardown for configuring the test environment has been deprecated.' +
      ' Please pass a `testEnvironmentOptions` object with TestEnvironmentOptions interface instead,' +
      ' see https://angular.io/api/core/testing/TestEnvironmentOptions'
  );

  testEnvironmentOptions = {
    ...testEnvironmentOptions,
    teardown: configuredTeardown,
  };
}

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), testEnvironmentOptions);
