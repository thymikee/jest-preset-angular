const mockInitTestEnvironment = jest.fn();
const mockUmdZoneJs = jest.fn();
const mockEsmZoneJs = jest.fn();
const mockGetTestBed = jest.fn(() => {
  return {
    initTestEnvironment: mockInitTestEnvironment,
  };
});
jest.mock('zone.js/bundles/zone-testing-bundle.umd', () => {
  const mockedResult = mockUmdZoneJs();

  return {
    mockedResult,
  };
});
jest.mock('zone.js/fesm2015/zone-testing-bundle.min.js', () => {
  const mockedResult = mockEsmZoneJs();

  return {
    mockedResult,
  };
});
jest.mock('@angular/core/testing', () => {
  return {
    getTestBed: mockGetTestBed,
  };
});

class BrowserDynamicTestingModuleStub {}
class PlatformRefStub {}
const mockPlatformBrowserDynamicTesting = jest.fn(() => new PlatformRefStub());
jest.mock('@angular/platform-browser-dynamic/testing', () => {
  return {
    BrowserDynamicTestingModule: new BrowserDynamicTestingModuleStub(),
    platformBrowserDynamicTesting: mockPlatformBrowserDynamicTesting,
  };
});

describe('setup-jest', () => {
  const assertOnInitTestEnv = (): void => {
    expect(mockGetTestBed).toHaveBeenCalled();
    expect(mockInitTestEnvironment).toHaveBeenCalled();
    expect(mockInitTestEnvironment.mock.calls[0][0]).toBeInstanceOf(BrowserDynamicTestingModuleStub);
    expect(mockPlatformBrowserDynamicTesting).toHaveBeenCalled();
    expect(mockPlatformBrowserDynamicTesting.mock.results[0].value).toBeInstanceOf(PlatformRefStub);
  };

  beforeEach(() => {
    delete globalThis.ngJest;
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('for CJS setup-jest, test environment initialization', () => {
    test('should call getTestBed() and initTestEnvironment() with the ModuleTeardownOptions object passed to ngJest', async () => {
      globalThis.ngJest = {
        teardown: {
          destroyAfterEach: false,
          rethrowErrors: true,
        },
      };
      await import('../../setup-jest');

      expect(mockUmdZoneJs).toHaveBeenCalled();
      assertOnInitTestEnv();
      expect(mockInitTestEnvironment.mock.calls[0][2]).toEqual({
        teardown: {
          destroyAfterEach: false,
          rethrowErrors: true,
        },
      });
    });

    test('should call getTestBed() and initTestEnvironment() with the destroyAfterEach passed to ngJest', async () => {
      const spyConsoleWarn = (console.warn = jest.fn());
      globalThis.ngJest = {
        destroyAfterEach: true,
      };

      await import('../../setup-jest');

      expect(mockUmdZoneJs).toHaveBeenCalled();
      expect(spyConsoleWarn).toHaveBeenCalled();
      expect(spyConsoleWarn.mock.calls[0][0]).toMatchInlineSnapshot(
        `"Passing destroyAfterEach for configuring the test environment has been deprecated. Please pass a \`teardown\` object with ModuleTeardownOptions interface instead, see https://github.com/angular/angular/blob/6952a0a3e68481564b2bc4955afb3ac186df6e34/packages/core/testing/src/test_bed_common.ts#L98"`,
      );
      assertOnInitTestEnv();
      expect(mockInitTestEnvironment.mock.calls[0][2]).toEqual({
        teardown: {
          destroyAfterEach: true,
        },
      });
    });
  });

  describe('for ESM setup-jest, test environment initialization', () => {
    test('should call getTestBed() and initTestEnvironment() with the ModuleTeardownOptions object passed to ngJest', async () => {
      globalThis.ngJest = {
        teardown: {
          destroyAfterEach: false,
          rethrowErrors: true,
        },
      };
      await import('../../setup-jest.mjs');

      expect(mockEsmZoneJs).toHaveBeenCalled();
      assertOnInitTestEnv();
      expect(mockInitTestEnvironment.mock.calls[0][2]).toEqual({
        teardown: {
          destroyAfterEach: false,
          rethrowErrors: true,
        },
      });
    });

    test('should call getTestBed() and initTestEnvironment() with the destroyAfterEach passed to ngJest', async () => {
      const spyConsoleWarn = (console.warn = jest.fn());
      globalThis.ngJest = {
        destroyAfterEach: true,
      };

      await import('../../setup-jest.mjs');

      expect(mockEsmZoneJs).toHaveBeenCalled();
      expect(spyConsoleWarn).toHaveBeenCalled();
      expect(spyConsoleWarn.mock.calls[0][0]).toMatchInlineSnapshot(
        `"Passing destroyAfterEach for configuring the test environment has been deprecated. Please pass a \`teardown\` object with ModuleTeardownOptions interface instead, see https://github.com/angular/angular/blob/6952a0a3e68481564b2bc4955afb3ac186df6e34/packages/core/testing/src/test_bed_common.ts#L98"`,
      );
      assertOnInitTestEnv();
      expect(mockInitTestEnvironment.mock.calls[0][2]).toEqual({
        teardown: {
          destroyAfterEach: true,
        },
      });
    });
  });
});
