import * as angularCore from '@angular/core';
import { ErrorHandler, NgModule, VERSION, COMPILER_OPTIONS } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { platformBrowserDynamicTesting, BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { polyfillEncoder, resolveTestEnvOptions } from '../utils';

const provideZonelessChangeDetectionFn =
    'provideExperimentalZonelessChangeDetection' in angularCore
        ? // eslint-disable-next-line import/namespace
          angularCore.provideExperimentalZonelessChangeDetection
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

export { setupZonelessTestEnv };
