console.warn(`
    Importing "setup-jest.js" directly is deprecated. The file "setup-jest.js" will be removed in the future.
    Please use "setupZoneTestEnv" function instead. Example:

    // setup-jest.ts
    import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

    setupZoneTestEnv();
`);

require('zone.js');
require('zone.js/testing');
const { TextEncoder, TextDecoder } = require('util');

const { getTestBed } = require('@angular/core/testing');
const {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} = require('@angular/platform-browser-dynamic/testing');

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
