require('zone.js');
require('zone.js/testing');

const { getTestBed } = require('@angular/core/testing');
const {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} = require('@angular/platform-browser-dynamic/testing');

const { polyfillEncoder, resolveTestEnvOptions } = require('../utils');

const setupZoneTestEnv = (options) => {
    polyfillEncoder();
    const testEnvironmentOptions = resolveTestEnvOptions(options);

    getTestBed().initTestEnvironment(
        [BrowserDynamicTestingModule],
        platformBrowserDynamicTesting(),
        testEnvironmentOptions,
    );
};

module.exports = {
    setupZoneTestEnv,
};
