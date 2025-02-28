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

class BrowserDynamicTestingModuleStub {}
class PlatformRefStub {}
class ErrorHandlerStub {}
const mockPlatformBrowserDynamicTesting = jest.fn(() => new PlatformRefStub());
jest.mock('@angular/platform-browser-dynamic/testing', () => {
    return {
        BrowserDynamicTestingModule: new BrowserDynamicTestingModuleStub(),
        platformBrowserDynamicTesting: mockPlatformBrowserDynamicTesting,
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

describe('Setup env utilities', () => {
    const assertOnInitTestEnv = (): void => {
        expect(mockGetTestBed).toHaveBeenCalled();
        expect(mockInitTestEnvironment.mock.calls[0][0][0]).toBeInstanceOf(BrowserDynamicTestingModuleStub);
        expect(mockPlatformBrowserDynamicTesting).toHaveBeenCalled();
        expect(mockPlatformBrowserDynamicTesting.mock.results[0].value).toBeInstanceOf(PlatformRefStub);
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
        // @ts-expect-error testing purpose
        delete globalThis.TextEncoder;
        jest.clearAllMocks();
        jest.resetModules();
    });

    describe('for CJS, test environment initialization', () => {
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

    describe('for ESM, test environment initialization', () => {
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
