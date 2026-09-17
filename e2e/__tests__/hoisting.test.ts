import { runJest } from '../run-jest';

describe('hoisting', () => {
    describe('CommonJS compiler', () => {
        it('should hoist Jest mock calls', async () => {
            const result = await runJest('hoisting', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should hoist Jest mock calls', async () => {
            const result = await runJest('hoisting', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
