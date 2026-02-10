require('zone.js');
require('zone.js/testing');

const { COMPILER_OPTIONS, NgModule, provideZoneChangeDetection, VERSION } = require('@angular/core');
const { getTestBed } = require('@angular/core/testing');
const { BrowserTestingModule, platformBrowserTesting } = require('@angular/platform-browser/testing');
const {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} = require('@angular/platform-browser-dynamic/testing');

const { polyfillEncoder, resolveTestEnvOptions } = require('../utils');

const setupZoneTestEnv = (options) => {
    polyfillEncoder();
    const resolvedOptions = resolveTestEnvOptions(options) ?? {};
    const { extraProviders = [], ...testEnvironmentOptions } = resolvedOptions;
    if (+VERSION.major >= 21) {
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
    } else if (+VERSION.major === 20) {
        getTestBed().initTestEnvironment(
            [BrowserTestingModule],
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
    } else {
        getTestBed().initTestEnvironment(
            [BrowserDynamicTestingModule],
            platformBrowserDynamicTesting(extraProviders),
            testEnvironmentOptions,
        );
    }
};

module.exports = {
    setupZoneTestEnv,
};
