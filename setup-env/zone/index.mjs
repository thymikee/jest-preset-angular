import 'zone.js';
import 'zone.js/testing';

import { COMPILER_OPTIONS, NgModule, provideZoneChangeDetection, VERSION } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { polyfillEncoder, resolveTestEnvOptions } from '../utils';

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

export { setupZoneTestEnv };
