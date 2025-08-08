const angularCore = require('@angular/core');
const { ErrorHandler, NgModule, VERSION, COMPILER_OPTIONS } = require('@angular/core');
const { getTestBed } = require('@angular/core/testing');
const { BrowserTestingModule, platformBrowserTesting } = require('@angular/platform-browser/testing');
const {
    platformBrowserDynamicTesting,
    BrowserDynamicTestingModule,
} = require('@angular/platform-browser-dynamic/testing');

const { polyfillEncoder, resolveTestEnvOptions } = require('../utils');
const provideZonelessChangeDetectionFn =
    'provideExperimentalZonelessChangeDetection' in angularCore
        ? angularCore.provideExperimentalZonelessChangeDetection
        : angularCore.provideZonelessChangeDetection;

const provideZonelessConfig = () => {
    class TestModule {}
    NgModule({
        providers: [
            provideZonelessChangeDetectionFn(),
            {
                provide: ErrorHandler,
                useValue: {
                    handleError: (e) => {
                        throw e;
                    },
                },
            },
        ],
    })(TestModule);

    return TestModule;
};

const setupZonelessTestEnv = (options) => {
    if (typeof provideZonelessChangeDetectionFn !== 'undefined') {
        polyfillEncoder();
        const testEnvironmentOptions = resolveTestEnvOptions(options);
        if (+VERSION.major >= 20) {
            getTestBed().initTestEnvironment(
                [BrowserTestingModule, provideZonelessConfig()],
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
                [BrowserDynamicTestingModule, provideZonelessConfig()],
                platformBrowserDynamicTesting(),
                testEnvironmentOptions,
            );
        }

        return;
    }

    throw Error(
        `Cannot find ${
            +VERSION.major >= 20 ? 'provideZonelessChangeDetection()' : 'provideExperimentalZonelessChangeDetection()'
        } to setup zoneless testing environment. ` +
            'Please use setupZoneTestEnv() from jest-preset-angular/setup-env/setup-zone-env.mjs instead.',
    );
};

module.exports = {
    setupZonelessTestEnv,
};
