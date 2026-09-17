import { runJest } from '../run-jest';
import { INSTALL_TIMEOUT, runYarnInstall } from '../utils';

describe('custom-jsdom-env', () => {
    beforeAll(() => runYarnInstall('custom-jsdom-env'), INSTALL_TIMEOUT + 30_000);

    describe('CommonJS compiler', () => {
        it('should run Angular tests in the custom jsdom environment', async () => {
            const result = await runJest('custom-jsdom-env', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should run Angular tests in the custom jsdom environment', async () => {
            const result = await runJest('custom-jsdom-env', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should run Angular tests in the custom jsdom environment', async () => {
            const result = await runJest('custom-jsdom-env', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM transpiler', () => {
        it('should run Angular tests in the custom jsdom environment', async () => {
            const result = await runJest('custom-jsdom-env', 'jest-transpiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
