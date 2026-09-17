import { runJest } from '../run-jest';

describe('ng-jit-transformers', () => {
    describe('CommonJS compiler', () => {
        it('should apply Angular JIT transformations', async () => {
            const result = await runJest('ng-jit-transformers', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should apply Angular JIT transformations', async () => {
            const result = await runJest('ng-jit-transformers', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should apply Angular JIT transformations', async () => {
            const result = await runJest('ng-jit-transformers', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM transpiler', () => {
        it('should apply Angular JIT transformations', async () => {
            const result = await runJest('ng-jit-transformers', 'jest-transpiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
