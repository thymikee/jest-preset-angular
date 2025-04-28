import { ErrorHandler, NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

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
      [BrowserTestingModule, provideZonelessConfig()],
      platformBrowserTesting(),
      testEnvironmentOptions,
    );

    return;
  }

  throw Error(
    'Cannot find provideExperimentalZonelessChangeDetection() to setup zoneless testing environment. ' +
      'Please use setupZoneTestEnv() from jest-preset-angular/setup-env/setup-zone-env.mjs instead.',
  );
};

export { setupZonelessTestEnv };
