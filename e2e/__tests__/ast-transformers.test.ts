import { jsonNoCache as runWithJsonNoCache } from '../run-jest';

const executeTest = (dirName: string): void => {
    test(`successfully runs the tests inside ${dirName} with isolatedModules: false`, () => {
        const { json } = runWithJsonNoCache(dirName);

        expect(json.success).toBe(true);
    });

    test(`successfully runs the tests inside ${dirName} with isolatedModules: true`, () => {
        const { json } = runWithJsonNoCache(dirName, ['-c=jest-isolated.config.js']);

        expect(json.success).toBe(true);
    });
};

describe('hoisting', () => {
    executeTest('ast-transformers/hoisting');
});

describe('ng-jit-transformers', () => {
    executeTest('ast-transformers/ng-jit-transformers');
});
