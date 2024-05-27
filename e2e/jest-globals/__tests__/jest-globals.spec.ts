import { describe, expect, test } from '@jest/globals';

describe('@jest/globals should work', () => {
    test.each([[1, 2]])('with 2D array', (arg1, arg2) => {
        expect(arg1).toBe(1);
        expect(arg2).toBe(2);
    });

    test.each([2])('with 1D array', (arg1) => {
        expect(arg1).toBe(2);
    });

    // eslint-disable-next-line
  (test.each([2]) as any)('test.each with 1D array and done', (arg1: any, done: () => void) => {
        // eslint-disable-next-line jest/no-standalone-expect
        expect(arg1).toBe(2);
        done();
    });

    // eslint-disable-next-line
  (test.each([[1, 2]]) as any)('test.each with done', (arg1: any, arg2: any, done: () => void) => {
        // eslint-disable-next-line jest/no-standalone-expect
        expect(arg1).toBe(1);
        // eslint-disable-next-line jest/no-standalone-expect
        expect(arg2).toBe(2);
        done();
    });

    test.each`
        foo  | bar
        ${1} | ${2}
    `('should work with table as a tagged template literal', ({ foo, bar }) => {
        expect(foo).toBe(1);
        expect(bar).toBe(2);
    });

    (
        test.each`
            foo  | bar
            ${1} | ${2}
  ` as any)( // eslint-disable-line
        'it.each should work with table as a tagged template literal with done',
    ({ foo, bar }: any, done: () => void) => { // eslint-disable-line
            expect(foo).toBe(1);
            expect(bar).toBe(2);
            done();
        },
    );

    test.each`
        foo  | bar
        ${1} | ${2}
    `('(async) it.each should work with table as a tagged template literal', async ({ foo, bar }) => {
        expect(foo).toBe(1);
        expect(bar).toBe(2);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    test.todo('a sample todo');
});
