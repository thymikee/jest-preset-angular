import { runJest } from '../run-jest';

describe('extra-providers-zone', () => {
    describe('CommonJS compiler', () => {
        it('should use extra providers in the Zone.js environment', async () => {
            const result = await runJest('extra-providers-zone', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should use extra providers in the Zone.js environment', async () => {
            const result = await runJest('extra-providers-zone', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
