describe('importing ES7 reflect', () => {

  let setMocks = () => {
    jest.mock('@angular/core/testing', () => ({ getTestBed: () => ({ initTestEnvironment() { } }) }), { virtual: true })
    jest.mock('@angular/platform-browser-dynamic/testing', () => ({ BrowserDynamicTestingModule: null, platformBrowserDynamicTesting: () => { } }), { virtual: true })
    jest.mock('zone.js/dist/zone.js', () => true, { virtual: true });
    jest.mock('zone.js/dist/proxy.js', () => true, { virtual: true });
    jest.mock('zone.js/dist/sync-test', () => true, { virtual: true });
    jest.mock('zone.js/dist/async-test', () => true, { virtual: true });
    jest.mock('zone.js/dist/fake-async-test', () => true, { virtual: true });
    jest.mock('../zone-patch', () => true, { virtual: true });

    jest.mock('core-js/es6/reflect', () => true, { virtual: true });
    jest.mock('core-js/es/reflect', () => true, { virtual: true });
  }

  let coreJs2Error = new Error('core-js@2 es7 reflect failed');
  let coreJs3Error = new Error('core-js@3 es7 reflect failed');

  beforeEach(() => setMocks());
  afterEach(() => jest.resetAllMocks());

  it('should throw if core-js es7-reflect is not installed', () => {
    jest.mock('core-js/es7/reflect', () => { throw coreJs2Error }, { virtual: true });
    jest.mock('core-js/proposals/reflect-metadata', () => { throw coreJs3Error }, { virtual: true });

    expect(() => require('../setupJest')).toThrow('core-js es7-reflect not found!');
  });

  it('should import from core-js@2', () => {
    jest.mock('core-js/es7/reflect', () => true, { virtual: true });
    jest.mock('core-js/proposals/reflect-metadata', () => { throw coreJs3Error }, { virtual: true });

    expect(() => require('../setupJest')).not.toThrow();
  });

  it('should import from core-js@3', () => {
    jest.mock('core-js/es7/reflect', () => { throw coreJs2Error }, { virtual: true });
    jest.mock('core-js/proposals/reflect-metadata', () => true, { virtual: true });

    expect(() => require('../setupJest')).not.toThrow();
  });

});
