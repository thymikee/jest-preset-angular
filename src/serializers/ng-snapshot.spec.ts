import ngSnapshot from './ng-snapshot';

type MockFixture = ReturnType<typeof createMockFixture>;

const createMockFixture = (componentInstance: Record<string, unknown>) => ({
    componentRef: {
        componentType: {
            ɵcmp: {
                selectors: [['test-component']],
            },
        },
        location: {
            nativeElement: {
                childNodes: [],
            },
        },
    },
    componentInstance,
});

describe('ng-snapshot snapshot serializer', () => {
    test('should return true when matching the condition', () => {
        expect(ngSnapshot.test({ componentRef: 'foo' })).toBe(true);
    });

    test.each([undefined, null, 1, {}])('should return false when not matching the condition', (value) => {
        expect(ngSnapshot.test(value)).toBe(false);
    });

    describe('print function', () => {
        const mockPrinter = () => '';
        const mockIndent = (str: string) => str;
        const mockOpts = { spacing: ' ' };
        const mockColors = {
            prop: { open: '', close: '' },
            value: { open: '', close: '' },
        };

        test('should handle proxy objects without throwing', () => {
            // Create a Proxy that mimics Signal Forms behavior
            const proxyFunction = new Proxy(() => {}, {
                get(target, prop) {
                    if (prop === 'constructor') {
                        return { name: 'ProxyFunction' };
                    }

                    return Reflect.get(target, prop);
                },
            });

            const fixture = createMockFixture({
                myForm: proxyFunction,
            });

            let result = '';

            expect(() => {
                result = ngSnapshot.print(
                    fixture as unknown as MockFixture,
                    mockPrinter,
                    mockIndent,
                    mockOpts,
                    mockColors,
                );
            }).not.toThrow();

            // Verify the proxy was serialized (either as a function or fallback object)
            expect(result).toMatch(/myForm=(\{[^}]+\}|"[^"]+")/);
        });

        test('should handle regular functions', () => {
            const regularFunction = function myFunction() {};

            const fixture = createMockFixture({
                myMethod: regularFunction,
            });

            const result = ngSnapshot.print(
                fixture as unknown as MockFixture,
                mockPrinter,
                mockIndent,
                mockOpts,
                mockColors,
            );
            expect(result).toContain('{[Function Function]}');
        });

        test('should handle objects with constructors', () => {
            class MyClass {}
            const instance = new MyClass();

            const fixture = createMockFixture({
                myProperty: instance,
            });

            const result = ngSnapshot.print(
                fixture as unknown as MockFixture,
                mockPrinter,
                mockIndent,
                mockOpts,
                mockColors,
            );
            expect(result).toContain('{[Function MyClass]}');
        });

        test('should handle primitive values', () => {
            const fixture = createMockFixture({
                stringProp: 'test',
                numberProp: 42,
                booleanProp: true,
                falseProp: false,
            });

            const result = ngSnapshot.print(
                fixture as unknown as MockFixture,
                mockPrinter,
                mockIndent,
                mockOpts,
                mockColors,
            );
            expect(result).toContain('{[Function String]}');
            expect(result).toContain('{[Function Number]}');
            expect(result).toContain('{[Function Boolean]}');
        });

        test('should handle functions using constructor name', () => {
            const fixture = createMockFixture({
                anonymousFunc: () => {},
            });

            const result = ngSnapshot.print(
                fixture as unknown as MockFixture,
                mockPrinter,
                mockIndent,
                mockOpts,
                mockColors,
            );
            expect(result).toContain('{[Function Function]}');
        });

        test('should fallback for values that throw on primitive conversion', () => {
            const fixture = createMockFixture({
                brokenValue: {
                    constructor: undefined,
                    [Symbol.toPrimitive]() {
                        throw new TypeError('Cannot convert object to primitive value');
                    },
                },
            });

            const result = ngSnapshot.print(
                fixture as unknown as MockFixture,
                mockPrinter,
                mockIndent,
                mockOpts,
                mockColors,
            );
            expect(result).toContain('{[Function Function]}');
        });

        test('should handle null and undefined', () => {
            const fixture = createMockFixture({
                nullProp: null,
                undefinedProp: undefined,
            });

            const result = ngSnapshot.print(
                fixture as unknown as MockFixture,
                mockPrinter,
                mockIndent,
                mockOpts,
                mockColors,
            );
            expect(result).toContain('"null"');
            expect(result).toContain('"undefined"');
        });
    });
});
