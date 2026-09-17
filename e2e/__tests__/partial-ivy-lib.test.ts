import { runJest } from '../run-jest';

describe('partial-ivy-lib', () => {
    describe('CommonJS compiler', () => {
        it('should consume partially compiled Ivy libraries', async () => {
            const result = await runJest('partial-ivy-lib', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should consume partially compiled Ivy libraries', async () => {
            const result = await runJest('partial-ivy-lib', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should consume partially compiled Ivy libraries', async () => {
            const result = await runJest('partial-ivy-lib', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM transpiler', () => {
        it('should consume partially compiled Ivy libraries', async () => {
            const result = await runJest('partial-ivy-lib', 'jest-transpiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
