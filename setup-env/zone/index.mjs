import 'zone.js';
import 'zone.js/testing';

import { COMPILER_OPTIONS, NgModule, provideZoneChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

import { polyfillEncoder, resolveTestEnvOptions } from '../utils';

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

export { setupZoneTestEnv };
