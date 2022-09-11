/* eslint-disable */

import type { TestEnvironmentOptions } from '@angular/core/testing';

declare global {
  var ngJest:
    | {
        skipNgcc?: boolean;
        tsconfig?: string;
        testEnvironmentOptions?: TestEnvironmentOptions;
      }
    | undefined;
}

export {};
