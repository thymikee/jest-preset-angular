/* eslint-disable */

import type { ModuleTeardownOptions } from "@angular/core/testing";

declare global {
  var ngJest: {
    skipNgcc?: boolean;
    tsconfig?: string;
    destroyAfterEach?: boolean;
    teardown?: ModuleTeardownOptions;
  } | undefined;
}

export {}
