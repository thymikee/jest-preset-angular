/* eslint-disable */

import {ModuleTeardownOptions} from "@angular/core/testing";

declare global {
  var ngJest: {
    skipNgcc?: boolean;
    tsconfig?: string;
    teardown?: ModuleTeardownOptions;
  } | undefined;
}

export {}
