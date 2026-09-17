import { runJest } from '../run-jest';

describe('ng-deep-import', () => {
    describe('CommonJS compiler', () => {
        it('should resolve Angular deep imports', async () => {
            const result = await runJest('ng-deep-import', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should resolve Angular deep imports', async () => {
            const result = await runJest('ng-deep-import', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should resolve Angular deep imports', async () => {
            const result = await runJest('ng-deep-import', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM transpiler', () => {
        it('should resolve Angular deep imports', async () => {
            const result = await runJest('ng-deep-import', 'jest-transpiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
