console.warn(
  'ng-jest-processor is deprecated and will be removed in the next major version v12.' +
    ' Please use jest-preset-angular/global-setup in Jest config instead, e.g. \n' +
    `
    module.exports = {
       globalSetup: 'jest-preset-angular/global-setup',
    };
  `
);

module.exports = require('./build/utils/ngcc-jest-processor');
