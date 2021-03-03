const { rootLogger } = require('ts-jest/dist/utils/logger');

rootLogger.warn(
  "Import setup jest file via `import 'jest-preset-angular';` is deprecated and will be removed in v9.0.0." +
    " Please switch to `import 'jest-preset-angular/setup-jest';`"
);

module.exports = require('./build/setup-jest.js');
