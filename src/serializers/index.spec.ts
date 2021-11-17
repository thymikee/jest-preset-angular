import exposedSerializers from './';

test('should expose 3 serializers', () => {
  expect(exposedSerializers).toMatchInlineSnapshot(`
    Array [
      "jest-preset-angular/build/serializers/html-comment",
      "jest-preset-angular/build/serializers/ng-snapshot",
      "jest-preset-angular/build/serializers/no-ng-attributes",
    ]
  `);
});
