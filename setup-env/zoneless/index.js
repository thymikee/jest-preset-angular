const { provideExperimentalZonelessChangeDetection, NgModule, ErrorHandler } = require('@angular/core');
const { getTestBed } = require('@angular/core/testing');
const {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} = require('@angular/platform-browser-dynamic/testing');

const { polyfillEncoder, resolveTestEnvOptions } = require('../utils');

const provideZonelessConfig = () => {
    class TestModule {}
    NgModule({
        providers: [
            provideExperimentalZonelessChangeDetection(),
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
    polyfillEncoder();
    if (typeof provideExperimentalZonelessChangeDetection !== 'undefined') {
        const testEnvironmentOptions = resolveTestEnvOptions(options);

        getTestBed().initTestEnvironment(
            [BrowserDynamicTestingModule, provideZonelessConfig()],
            platformBrowserDynamicTesting(),
            testEnvironmentOptions,
        );

        return;
    }

    throw Error(
        'Cannot find provideExperimentalZonelessChangeDetection() to setup zoneless testing environment. ' +
            'Please use setupZoneTestEnv() from jest-preset-angular/setup-env/setup-zone-env.mjs instead.',
    );
};

module.exports = {
    setupZonelessTestEnv,
};
