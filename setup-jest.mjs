console.warn(`
    Importing "setup-jest.mjs" directly is deprecated. The file "setup-jest.mjs" will be removed in the future.
    Please use "setupZoneTestEnv" function instead. Example:

    // setup-jest.ts
    import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';

    setupZoneTestEnv();
`);

import 'zone.js';
import 'zone.js/testing';
import { TextEncoder, TextDecoder } from 'util';

import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

if (typeof globalThis.TextEncoder === 'undefined') {
    globalThis.TextEncoder = TextEncoder;
    globalThis.TextDecoder = TextDecoder;
}

const testEnvironmentOptions = globalThis.ngJest?.testEnvironmentOptions ?? Object.create(null);

getTestBed().initTestEnvironment(
    [BrowserDynamicTestingModule],
    platformBrowserDynamicTesting(),
    testEnvironmentOptions,
);
