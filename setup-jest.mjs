import 'zone.js/fesm2015/zone-testing-bundle.min.js';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

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
