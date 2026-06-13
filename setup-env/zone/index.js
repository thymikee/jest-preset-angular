require('zone.js');
require('zone.js/testing');

const { COMPILER_OPTIONS, NgModule, provideZoneChangeDetection } = require('@angular/core');
const { getTestBed } = require('@angular/core/testing');
const { BrowserTestingModule, platformBrowserTesting } = require('@angular/platform-browser/testing');

const { polyfillEncoder, resolveTestEnvOptions } = require('../utils');

const setupZoneTestEnv = (options) => {
    polyfillEncoder();
    const resolvedOptions = resolveTestEnvOptions(options) ?? {};
    const { extraProviders = [], ...testEnvironmentOptions } = resolvedOptions;

    class TestModule {}
    NgModule({
        providers: [provideZoneChangeDetection()],
    })(TestModule);

    getTestBed().initTestEnvironment(
        [BrowserTestingModule, TestModule],
        platformBrowserTesting([
            {
                provide: COMPILER_OPTIONS,
                useValue: {},
                multi: true,
            },
            ...extraProviders,
        ]),
        testEnvironmentOptions,
    );
};

module.exports = {
    setupZoneTestEnv,
};
