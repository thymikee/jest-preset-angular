import { ErrorHandler, NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { polyfillEncoder, resolveTestEnvOptions } from '../utils';

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

export {
  setupZonelessTestEnv
}
