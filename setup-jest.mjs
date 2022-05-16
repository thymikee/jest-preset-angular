import 'zone.js/fesm2015/zone-testing-bundle.min.js';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

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
