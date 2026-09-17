import { runJest } from '../run-jest';

describe('babel-support', () => {
    describe('CommonJS compiler', () => {
        it('should apply Babel transformations', async () => {
            const result = await runJest('babel-support', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should apply Babel transformations', async () => {
            const result = await runJest('babel-support', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should apply Babel transformations', async () => {
            const result = await runJest('babel-support', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM transpiler', () => {
        it('should apply Babel transformations', async () => {
            const result = await runJest('babel-support', 'jest-transpiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
