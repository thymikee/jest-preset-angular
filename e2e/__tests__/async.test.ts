import { runJest } from '../run-jest';

describe('async', () => {
    describe('CommonJS compiler', () => {
        it('should support asynchronous Angular tests', async () => {
            const result = await runJest('async', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should support asynchronous Angular tests', async () => {
            const result = await runJest('async', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
