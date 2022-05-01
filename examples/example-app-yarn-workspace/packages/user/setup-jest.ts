// Can't use standard setup-jest, b/c it uses require()
// import 'jest-preset-angular/setup-jest';

import 'zone.js/fesm2015/zone-testing-bundle.min.js';
import './jest-global-mocks';

import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
