import camelCase from 'lodash-es/camelCase';
import { union } from 'set-utilities';
import { __assign } from 'tslib';

test('should pass', () => {
    expect(camelCase('foo-bar')).toBe('fooBar');
    expect(typeof __assign).toBe('function');
    expect(union(new Set([1, 2, 3]), new Set([4, 5, 6]))).toStrictEqual(new Set([1, 2, 3, 4, 5, 6]));
});
