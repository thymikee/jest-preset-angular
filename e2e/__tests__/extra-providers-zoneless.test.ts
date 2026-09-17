import { runJest } from '../run-jest';

describe('extra-providers-zoneless', () => {
    describe('CommonJS compiler', () => {
        it('should use extra providers in the zoneless environment', async () => {
            const result = await runJest('extra-providers-zoneless', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should use extra providers in the zoneless environment', async () => {
            const result = await runJest('extra-providers-zoneless', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
