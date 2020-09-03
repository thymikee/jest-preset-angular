'use strict';

require('../utils/reflect-metadata');

try {
  // If the user are using zone.js 0.11.1+
  // all jest support logic are implemented inside zone.js
  // we only need to load zone-testing.umd.js module
  require('zone.js/bundles/zone-testing-bundle.umd.js');
} catch (err) {
  // Fallback logic to load zone and zone-patch
  // when the user still use zone.js 0.10.x
  require('zone.js/dist/zone');
  require('zone.js/dist/proxy');
  require('zone.js/dist/sync-test');
  require('zone.js/dist/async-test');
  require('zone.js/dist/fake-async-test');
  require('../zone-patch');
}

const getTestBed = require('@angular/core/testing').getTestBed;
const BrowserDynamicTestingModule = require('@angular/platform-browser-dynamic/testing').BrowserDynamicTestingModule;
const platformBrowserDynamicTesting = require('@angular/platform-browser-dynamic/testing')
  .platformBrowserDynamicTesting;

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
