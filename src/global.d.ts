/* eslint-disable */

import type { ModuleTeardownOptions, TestEnvironmentOptions } from '@angular/core/testing';

declare global {
  var ngJest:
    | {
        skipNgcc?: boolean;
        tsconfig?: string;
        destroyAfterEach?: boolean;
        teardown?: ModuleTeardownOptions;
        testEnvironmentOptions?: TestEnvironmentOptions;
      }
    | undefined;
}

export {};
