require('zone.js');
require('zone.js/testing');

const { TextEncoder, TextDecoder } = require('util');

const { getTestBed } = require('@angular/core/testing');
const {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} = require('@angular/platform-browser-dynamic/testing');

const polyfillEncoder = () => {
    if (typeof globalThis.TextEncoder === 'undefined') {
        globalThis.TextEncoder = TextEncoder;
        globalThis.TextDecoder = TextDecoder;
    }
};

const resolveTestEnvOptions = (options) => {
    const globalTestEnvOptions = globalThis.ngJest?.testEnvironmentOptions;
    if (globalTestEnvOptions) {
        console.warn(
            'Setting testEnvironmentOptions via globalThis.ngJest is deprecated. Please provide testEnvironmentOptions via function argument',
        );
    }

    return globalTestEnvOptions ?? options;
};

const setupZoneTestEnv = (options) => {
    polyfillEncoder();
    const testEnvironmentOptions = resolveTestEnvOptions(options);

    getTestBed().initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
        testEnvironmentOptions,
    );
};

module.exports = {
    setupZoneTestEnv,
};
