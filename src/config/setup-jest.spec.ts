const mockInitTestEnvironment = jest.fn();
const mockZoneJs = jest.fn();
const mockZoneJsTesting = jest.fn();
const mockGetTestBed = jest.fn(() => {
  return {
    initTestEnvironment: mockInitTestEnvironment,
  };
});
jest.mock('zone.js', () => {
  const mockedResult = mockZoneJs();

  return {
    mockedResult,
  };
});
jest.mock('zone.js/testing', () => {
  const mockedResult = mockZoneJsTesting();

  return {
    mockedResult,
  };
});
jest.mock('@angular/core/testing', () => {
  return {
    getTestBed: mockGetTestBed,
  };
});

class BrowserTestingModuleStub {}
class PlatformRefStub {}
class ErrorHandlerStub {}
const mockPlatformBrowserTesting = jest.fn(() => new PlatformRefStub());
jest.mock('@angular/platform-browser/testing', () => {
  return {
    BrowserTestingModule: new BrowserTestingModuleStub(),
    platformBrowserTesting: mockPlatformBrowserTesting,
  };
});
const mockProvideExperimentalZonelessChangeDetection = jest.fn();
jest.mock('@angular/core', () => {
  return {
    provideExperimentalZonelessChangeDetection: mockProvideExperimentalZonelessChangeDetection,
    ErrorHandler: ErrorHandlerStub,
    NgModule: () => {
      return jest.fn();
    },
  };
});

describe('setup-jest', () => {
  const assertOnInitTestEnv = (): void => {
    expect(mockGetTestBed).toHaveBeenCalled();
    expect(mockInitTestEnvironment.mock.calls[0][0][0]).toBeInstanceOf(BrowserTestingModuleStub);
    expect(mockPlatformBrowserTesting).toHaveBeenCalled();
    expect(mockPlatformBrowserTesting.mock.results[0].value).toBeInstanceOf(PlatformRefStub);
    expect(mockInitTestEnvironment.mock.calls[0][2]).toEqual({
      teardown: {
        destroyAfterEach: false,
        rethrowErrors: true,
      },
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true,
    });
  };

  beforeEach(() => {
    delete globalThis.ngJest;
    // @ts-expect-error testing purpose
    delete globalThis.TextEncoder;
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('for CJS setup-jest, test environment initialization', () => {
    it('should setup test environment with setup-jest file', async () => {
      globalThis.ngJest = {
        testEnvironmentOptions: {
          teardown: {
            destroyAfterEach: false,
            rethrowErrors: true,
          },
          errorOnUnknownElements: true,
          errorOnUnknownProperties: true,
        },
      };

      await import('../../setup-jest.js');

      expect(globalThis.TextEncoder).toBeDefined();
      expect(mockZoneJs).toHaveBeenCalled();
      expect(mockZoneJsTesting).toHaveBeenCalled();
      assertOnInitTestEnv();
    });

    it('should setup test environment with setupZoneTestEnv()', async () => {
      const { setupZoneTestEnv } = await import('../../setup-env/zone/index.js');

      setupZoneTestEnv({
        teardown: {
          destroyAfterEach: false,
          rethrowErrors: true,
        },
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true,
      });

      expect(globalThis.TextEncoder).toBeDefined();
      expect(mockZoneJs).toHaveBeenCalled();
      expect(mockZoneJsTesting).toHaveBeenCalled();
      assertOnInitTestEnv();
    });

    it('should setup test environment with setupZonelessTestEnv()', async () => {
      const { setupZonelessTestEnv } = await import('../../setup-env/zoneless/index.js');

      setupZonelessTestEnv({
        teardown: {
          destroyAfterEach: false,
          rethrowErrors: true,
        },
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true,
      });

      expect(globalThis.TextEncoder).toBeDefined();
      expect(mockZoneJs).not.toHaveBeenCalled();
      expect(mockZoneJsTesting).not.toHaveBeenCalled();
      assertOnInitTestEnv();
      expect(mockProvideExperimentalZonelessChangeDetection).toHaveBeenCalled();
    });
  });

  describe('for ESM setup-jest, test environment initialization', () => {
    it('should setup test environment with setup-jest file', async () => {
      globalThis.ngJest = {
        testEnvironmentOptions: {
          teardown: {
            destroyAfterEach: false,
            rethrowErrors: true,
          },
          errorOnUnknownElements: true,
          errorOnUnknownProperties: true,
        },
      };

      await import('../../setup-jest.mjs');

      expect(globalThis.TextEncoder).toBeDefined();
      expect(mockZoneJs).toHaveBeenCalled();
      expect(mockZoneJsTesting).toHaveBeenCalled();
      assertOnInitTestEnv();
    });

    it('should setup test environment with setupZoneTestEnv()', async () => {
      const { setupZoneTestEnv } = await import('../../setup-env/zone/index.mjs');

      setupZoneTestEnv({
        teardown: {
          destroyAfterEach: false,
          rethrowErrors: true,
        },
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true,
      });

      expect(globalThis.TextEncoder).toBeDefined();
      expect(mockZoneJs).toHaveBeenCalled();
      expect(mockZoneJsTesting).toHaveBeenCalled();
      assertOnInitTestEnv();
    });

    it('should setup test environment with setupZonelessTestEnv()', async () => {
      const { setupZonelessTestEnv } = await import('../../setup-env/zoneless/index.mjs');

      setupZonelessTestEnv({
        teardown: {
          destroyAfterEach: false,
          rethrowErrors: true,
        },
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true,
      });

      expect(globalThis.TextEncoder).toBeDefined();
      expect(mockZoneJs).not.toHaveBeenCalled();
      expect(mockZoneJsTesting).not.toHaveBeenCalled();
      assertOnInitTestEnv();
      expect(mockProvideExperimentalZonelessChangeDetection).toHaveBeenCalled();
    });
  });
});
