require('zone.js');
require('zone.js/testing');

const { getTestBed } = require('@angular/core/testing');
const { BrowserTestingModule, platformBrowserTesting } = require('@angular/platform-browser/testing');

const { polyfillEncoder, resolveTestEnvOptions } = require('../utils');

const setupZoneTestEnv = (options) => {
  polyfillEncoder();
  const testEnvironmentOptions = resolveTestEnvOptions(options);

  getTestBed().initTestEnvironment([BrowserTestingModule], platformBrowserTesting(), testEnvironmentOptions);
};

module.exports = {
  setupZoneTestEnv,
};
