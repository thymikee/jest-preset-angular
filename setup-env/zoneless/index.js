const { ErrorHandler, NgModule, COMPILER_OPTIONS, provideZonelessChangeDetection } = require('@angular/core');
const { getTestBed } = require('@angular/core/testing');
const { BrowserTestingModule, platformBrowserTesting } = require('@angular/platform-browser/testing');

const { polyfillEncoder, resolveTestEnvOptions } = require('../utils');

const provideZonelessConfig = () => {
    class TestModule {}
    NgModule({
        providers: [
            provideZonelessChangeDetection(),
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
    const resolvedOptions = resolveTestEnvOptions(options) ?? {};
    const { extraProviders = [], ...testEnvironmentOptions } = resolvedOptions;
    getTestBed().initTestEnvironment(
        [BrowserTestingModule, provideZonelessConfig()],
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
    setupZonelessTestEnv,
};
