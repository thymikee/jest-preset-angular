import 'zone.js';
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { polyfillEncoder, resolveTestEnvOptions } from '../utils';

const setupZoneTestEnv = (options) => {
    polyfillEncoder();
    const testEnvironmentOptions = resolveTestEnvOptions(options);

    getTestBed().initTestEnvironment(
        [BrowserDynamicTestingModule],
        platformBrowserDynamicTesting(),
        testEnvironmentOptions,
    );
};

export { setupZoneTestEnv };
