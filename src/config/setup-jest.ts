!process.execArgv.includes('--experimental-vm-modules')
  ? require('zone.js/bundles/zone-testing-bundle.umd.js')
  : require('zone.js/fesm2015/zone-testing-bundle.min.js');

const getTestBed = require('@angular/core/testing').getTestBed;
const { BrowserDynamicTestingModule } = require('@angular/platform-browser-dynamic/testing');
const { platformBrowserDynamicTesting } = require('@angular/platform-browser-dynamic/testing')

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
