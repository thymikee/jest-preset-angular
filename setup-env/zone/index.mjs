import 'zone.js';
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

import { polyfillEncoder, resolveTestEnvOptions } from '../utils';

const setupZoneTestEnv = (options) => {
  polyfillEncoder();
  const testEnvironmentOptions = resolveTestEnvOptions(options);

  getTestBed().initTestEnvironment([BrowserTestingModule], platformBrowserTesting(), testEnvironmentOptions);
};

export { setupZoneTestEnv };
