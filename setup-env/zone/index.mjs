import 'zone.js';
import 'zone.js/testing';

import { COMPILER_OPTIONS, VERSION } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { polyfillEncoder, resolveTestEnvOptions } from '../utils';

const setupZoneTestEnv = (options) => {
    polyfillEncoder();
    const testEnvironmentOptions = resolveTestEnvOptions(options);
    if (+VERSION.major >= 20) {
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

export { setupZoneTestEnv };
