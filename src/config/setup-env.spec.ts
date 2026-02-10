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
class BrowserDynamicTestingModuleStub {}
class PlatformRefStub {}
class ErrorHandlerStub {}
const mockPlatformBrowserTesting = jest.fn(() => new PlatformRefStub());
const mockPlatformBrowserDynamicTesting = jest.fn(() => new PlatformRefStub());
jest.mock('@angular/platform-browser/testing', () => {
    return {
        BrowserTestingModule: new BrowserTestingModuleStub(),
        platformBrowserTesting: mockPlatformBrowserTesting,
    };
});
jest.mock('@angular/platform-browser-dynamic/testing', () => {
    return {
        BrowserDynamicTestingModule: new BrowserDynamicTestingModuleStub(),
        platformBrowserDynamicTesting: mockPlatformBrowserDynamicTesting,
    };
});
const mockProvideExperimentalZonelessChangeDetection = jest.fn();
const mockCompilerOptions = 'COMPILER_OPTIONS';
jest.mock('@angular/core', () => {
    return {
        provideExperimentalZonelessChangeDetection: mockProvideExperimentalZonelessChangeDetection,
        ErrorHandler: ErrorHandlerStub,
        NgModule: () => {
            return jest.fn();
        },
        VERSION: {
            major: '20',
        },
        COMPILER_OPTIONS: mockCompilerOptions,
    };
});

describe('Setup env utilities', () => {
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
        // @ts-expect-error testing purpose
        delete globalThis.TextEncoder;
        // @ts-expect-error testing purpose
        delete globalThis.ngJest;
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

        it('should setup test environment with setupZoneTestEnv() and extraProviders', async () => {
            const { setupZoneTestEnv } = await import('../../setup-env/zone/index.js');

            const mockProvider = { provide: 'TEST_TOKEN', useValue: 'test-value' };

            setupZoneTestEnv({
                teardown: {
                    destroyAfterEach: false,
                    rethrowErrors: true,
                },
                errorOnUnknownElements: true,
                errorOnUnknownProperties: true,
                extraProviders: [mockProvider],
            });

            expect(globalThis.TextEncoder).toBeDefined();
            expect(mockZoneJs).toHaveBeenCalled();
            expect(mockZoneJsTesting).toHaveBeenCalled();
            expect(mockGetTestBed).toHaveBeenCalled();
            expect(mockPlatformBrowserTesting).toHaveBeenCalledWith([
                {
                    provide: mockCompilerOptions,
                    useValue: {},
                    multi: true,
                },
                mockProvider,
            ]);
        });

        it('should resolve extraProviders from global testEnvironmentOptions for setupZoneTestEnv()', async () => {
            const { setupZoneTestEnv } = await import('../../setup-env/zone/index.js');

            const globalProvider = { provide: 'GLOBAL_TOKEN', useValue: 'global-value' };
            const argumentProvider = { provide: 'ARG_TOKEN', useValue: 'arg-value' };
            // @ts-expect-error testing purpose
            globalThis.ngJest = {
                testEnvironmentOptions: {
                    teardown: {
                        destroyAfterEach: false,
                        rethrowErrors: true,
                    },
                    errorOnUnknownElements: true,
                    errorOnUnknownProperties: true,
                    extraProviders: [globalProvider],
                },
            };

            setupZoneTestEnv({
                extraProviders: [argumentProvider],
            });

            expect(mockPlatformBrowserTesting).toHaveBeenCalledWith([
                {
                    provide: mockCompilerOptions,
                    useValue: {},
                    multi: true,
                },
                globalProvider,
            ]);
            expect(mockPlatformBrowserTesting).toHaveBeenCalledWith([
                { multi: true, provide: 'COMPILER_OPTIONS', useValue: {} },
                { provide: 'GLOBAL_TOKEN', useValue: 'global-value' },
            ]);
            expect(mockInitTestEnvironment.mock.calls[0]).toEqual(
                expect.arrayContaining([
                    {
                        errorOnUnknownElements: true,
                        errorOnUnknownProperties: true,
                        teardown: { destroyAfterEach: false, rethrowErrors: true },
                    },
                ]),
            );
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

        it('should setup test environment with setupZonelessTestEnv() and extraProviders', async () => {
            const { setupZonelessTestEnv } = await import('../../setup-env/zoneless/index.js');

            const mockProvider = { provide: 'TEST_TOKEN', useValue: 'test-value' };

            setupZonelessTestEnv({
                teardown: {
                    destroyAfterEach: false,
                    rethrowErrors: true,
                },
                errorOnUnknownElements: true,
                errorOnUnknownProperties: true,
                extraProviders: [mockProvider],
            });

            expect(globalThis.TextEncoder).toBeDefined();
            expect(mockZoneJs).not.toHaveBeenCalled();
            expect(mockZoneJsTesting).not.toHaveBeenCalled();
            expect(mockGetTestBed).toHaveBeenCalled();
            expect(mockPlatformBrowserTesting).toHaveBeenCalledWith([
                {
                    provide: mockCompilerOptions,
                    useValue: {},
                    multi: true,
                },
                mockProvider,
            ]);
            expect(mockProvideExperimentalZonelessChangeDetection).toHaveBeenCalled();
        });

        it('should resolve extraProviders from global testEnvironmentOptions for setupZonelessTestEnv()', async () => {
            const { setupZonelessTestEnv } = await import('../../setup-env/zoneless/index.js');

            const globalProvider = { provide: 'GLOBAL_TOKEN', useValue: 'global-value' };
            const argumentProvider = { provide: 'ARG_TOKEN', useValue: 'arg-value' };
            // @ts-expect-error testing purpose
            globalThis.ngJest = {
                testEnvironmentOptions: {
                    teardown: {
                        destroyAfterEach: false,
                        rethrowErrors: true,
                    },
                    errorOnUnknownElements: true,
                    errorOnUnknownProperties: true,
                    extraProviders: [globalProvider],
                },
            };

            setupZonelessTestEnv({
                extraProviders: [argumentProvider],
            });

            expect(mockPlatformBrowserTesting).toHaveBeenCalledWith([
                { multi: true, provide: 'COMPILER_OPTIONS', useValue: {} },
                { provide: 'GLOBAL_TOKEN', useValue: 'global-value' },
            ]);
            expect(mockInitTestEnvironment.mock.calls[0]).toEqual(
                expect.arrayContaining([
                    {
                        teardown: {
                            destroyAfterEach: false,
                            rethrowErrors: true,
                        },
                        errorOnUnknownElements: true,
                        errorOnUnknownProperties: true,
                    },
                ]),
            );
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

        it('should setup test environment with setupZoneTestEnv() and extraProviders', async () => {
            const { setupZoneTestEnv } = await import('../../setup-env/zone/index.mjs');

            const mockProvider = { provide: 'TEST_TOKEN', useValue: 'test-value' };

            setupZoneTestEnv({
                teardown: {
                    destroyAfterEach: false,
                    rethrowErrors: true,
                },
                errorOnUnknownElements: true,
                errorOnUnknownProperties: true,
                extraProviders: [mockProvider],
            });

            expect(globalThis.TextEncoder).toBeDefined();
            expect(mockZoneJs).toHaveBeenCalled();
            expect(mockZoneJsTesting).toHaveBeenCalled();
            expect(mockGetTestBed).toHaveBeenCalled();
            expect(mockPlatformBrowserTesting).toHaveBeenCalledWith([
                {
                    provide: mockCompilerOptions,
                    useValue: {},
                    multi: true,
                },
                mockProvider,
            ]);
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

        it('should setup test environment with setupZonelessTestEnv() and extraProviders', async () => {
            const { setupZonelessTestEnv } = await import('../../setup-env/zoneless/index.mjs');

            const mockProvider = { provide: 'TEST_TOKEN', useValue: 'test-value' };

            setupZonelessTestEnv({
                teardown: {
                    destroyAfterEach: false,
                    rethrowErrors: true,
                },
                errorOnUnknownElements: true,
                errorOnUnknownProperties: true,
                extraProviders: [mockProvider],
            });

            expect(globalThis.TextEncoder).toBeDefined();
            expect(mockZoneJs).not.toHaveBeenCalled();
            expect(mockZoneJsTesting).not.toHaveBeenCalled();
            expect(mockGetTestBed).toHaveBeenCalled();
            expect(mockPlatformBrowserTesting).toHaveBeenCalledWith([
                {
                    provide: mockCompilerOptions,
                    useValue: {},
                    multi: true,
                },
                mockProvider,
            ]);
            expect(mockProvideExperimentalZonelessChangeDetection).toHaveBeenCalled();
        });
    });
});
