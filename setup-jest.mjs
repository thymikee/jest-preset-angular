import 'zone.js/fesm2015/zone-testing-bundle.min.js';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

let testEnvironmentOptions = globalThis.ngJest?.testEnvironmentOptions ?? Object.create(null);

const configuredDestroyAfterEach = globalThis.ngJest?.destroyAfterEach;
if (configuredDestroyAfterEach) {
  console.warn(
    'Passing destroyAfterEach for configuring the test environment has been deprecated.' +
      ' Please pass a `testEnvironmentOptions` object with TestEnvironmentOptions interface instead,' +
      ' see https://angular.io/api/core/testing/TestEnvironmentOptions',
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
      ' see https://angular.io/api/core/testing/TestEnvironmentOptions',
  );

  testEnvironmentOptions = {
    ...testEnvironmentOptions,
    teardown: configuredTeardown,
  };
}

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), testEnvironmentOptions);
