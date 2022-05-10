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
    jest.clearAllMocks();
  });

  test('should initialize test environment with getTestBed() and initTestEnvironment() for CJS setup-jest', async () => {
    await import('../../setup-jest');

    expect(mockUmdZoneJs).toHaveBeenCalled();
    assertOnInitTestEnv();
  });

  test('should initialize test environment with getTestBed() and initTestEnvironment() for ESM setup-jest', async () => {
    await import('../../setup-jest.mjs');

    expect(mockEsmZoneJs).toHaveBeenCalled();
    assertOnInitTestEnv();
  });
});
