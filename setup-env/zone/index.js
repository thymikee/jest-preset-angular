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
    const testEnvironmentOptions = resolveTestEnvOptions(options);
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
            ]),
            testEnvironmentOptions,
        );
    } else {
        getTestBed().initTestEnvironment(
            [BrowserDynamicTestingModule],
            platformBrowserDynamicTesting(),
            testEnvironmentOptions,
        );
    }
};

module.exports = {
    setupZoneTestEnv,
};
