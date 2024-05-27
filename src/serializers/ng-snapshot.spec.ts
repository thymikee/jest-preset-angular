import ngSnapshot from './ng-snapshot';

describe('ng-snapshot snapshot serializer', () => {
    test('should return true when matching the condition', () => {
        expect(ngSnapshot.test({ componentRef: 'foo' })).toBe(true);
    });

    test.each([undefined, null, 1, {}])('should return false when not matching the condition', (value) => {
        expect(ngSnapshot.test(value)).toBe(false);
    });
});
