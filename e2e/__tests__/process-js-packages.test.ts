import { runJest } from '../run-jest';
import { INSTALL_TIMEOUT, runYarnInstall } from '../utils';

describe('process-js-packages', () => {
    beforeAll(() => runYarnInstall('process-js-packages'), INSTALL_TIMEOUT + 30_000);

    describe('CommonJS compiler', () => {
        it('should process JavaScript package imports', async () => {
            const result = await runJest('process-js-packages', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should process JavaScript package imports', async () => {
            const result = await runJest('process-js-packages', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should process JavaScript package imports', async () => {
            const result = await runJest('process-js-packages', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM transpiler', () => {
        it('should process JavaScript package imports', async () => {
            const result = await runJest('process-js-packages', 'jest-transpiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
