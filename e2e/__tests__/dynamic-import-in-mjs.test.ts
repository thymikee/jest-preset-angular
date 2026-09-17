import { runJest } from '../run-jest';

describe('dynamic-import-in-mjs', () => {
    describe('CommonJS compiler', () => {
        it('should resolve dynamic imports in mjs modules', async () => {
            const result = await runJest('dynamic-import-in-mjs', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should resolve dynamic imports in mjs modules', async () => {
            const result = await runJest('dynamic-import-in-mjs', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should resolve dynamic imports in mjs modules', async () => {
            const result = await runJest('dynamic-import-in-mjs', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM transpiler', () => {
        it('should resolve dynamic imports in mjs modules', async () => {
            const result = await runJest('dynamic-import-in-mjs', 'jest-transpiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
