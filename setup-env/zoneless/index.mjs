import { ErrorHandler, NgModule, COMPILER_OPTIONS, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

import { polyfillEncoder, resolveTestEnvOptions } from '../utils';

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

export { setupZonelessTestEnv };
