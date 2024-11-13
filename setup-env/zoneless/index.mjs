import { ErrorHandler, NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { polyfillEncoder, resolveTestEnvOptions } from '../utils.mjs';

export const setupZonelessTestEnv = (options) => {
    if (typeof provideExperimentalZonelessChangeDetection !== 'undefined') {
        polyfillEncoder();
        const testEnvironmentOptions = resolveTestEnvOptions(options);
        @NgModule({
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
        })
        export class TestModule {}

        getTestBed().initTestEnvironment(
            [BrowserDynamicTestingModule, TestModule],
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
