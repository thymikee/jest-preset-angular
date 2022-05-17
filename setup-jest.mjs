import 'zone.js/fesm2015/zone-testing-bundle.min.js';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

let teardown = globalThis.ngJest?.teardown;
const configuredDestroyAfterEach = globalThis.ngJest?.destroyAfterEach;

if (configuredDestroyAfterEach) {
  console.warn('Passing destroyAfterEach for configuring the test environment has been deprecated.' +
    ' Please pass a `teardown` object with ModuleTeardownOptions interface instead,' +
    ' see https://github.com/angular/angular/blob/6952a0a3e68481564b2bc4955afb3ac186df6e34/packages/core/testing/src/test_bed_common.ts#L98');
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
