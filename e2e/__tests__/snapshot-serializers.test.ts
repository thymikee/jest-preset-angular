import { runJest } from '../run-jest';

describe('snapshot-serializers', () => {
    describe('CommonJS compiler', () => {
        it('should serialize Angular component snapshots', async () => {
            const result = await runJest('snapshot-serializers', 'jest-compiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM compiler', () => {
        it('should serialize Angular component snapshots', async () => {
            const result = await runJest('snapshot-serializers', 'jest-compiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('CommonJS transpiler', () => {
        it('should serialize Angular component snapshots', async () => {
            const result = await runJest('snapshot-serializers', 'jest-transpiler-cjs.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });

    describe('ESM transpiler', () => {
        it('should serialize Angular component snapshots', async () => {
            const result = await runJest('snapshot-serializers', 'jest-transpiler-esm.config.ts');

            expect(result).toMatchObject({ exitCode: 0 });
        });
    });
});
