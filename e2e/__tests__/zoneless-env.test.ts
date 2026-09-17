import { runJest } from '../run-jest';

describe('zoneless-env', () => {
    describe('CommonJS compiler', () => {
        it('should run Angular tests without Zone.js', async () => {
            const result = await runJest('zoneless-env', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should run Angular tests without Zone.js', async () => {
            const result = await runJest('zoneless-env', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should run Angular tests without Zone.js', async () => {
            const result = await runJest('zoneless-env', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM transpiler', () => {
        it('should run Angular tests without Zone.js', async () => {
            const result = await runJest('zoneless-env', 'jest-transpiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
