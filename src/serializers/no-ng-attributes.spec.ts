import noNgAttr from './no-ng-attributes';

describe('no-ng-attributes snapshot serializer', () => {
  test('should return true when matching the condition with attributes to remove', () => {
    const validElement = document.createElement('DIV');
    ['ng-reflect', '_nghost', '_ngcontent', 'ng-version'].forEach((attrToRemove) => {
      validElement.setAttribute(attrToRemove, 'foo');
    });

    expect(noNgAttr.test(validElement)).toBe(true);

    validElement.remove();
  });

  test('should return true when matching the condition with attributes to clean', () => {
    const validElement = document.createElement('SECTION');
    ['class', 'id', 'for', 'aria-owns', 'aria-labelledby', 'aria-controls'].forEach((attrToClean) => {
      validElement.setAttribute(attrToClean, 'foo');
    });

    expect(noNgAttr.test(validElement)).toBe(true);

    validElement.remove();
  });

  test.each([undefined, null, 1, document.createElement('INPUT')])(
    'should return false when not matching the condition',
    (val) => {
      expect(noNgAttr.test(val)).toBe(false);
    },
  );
});
