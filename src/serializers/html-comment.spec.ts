import htmlComment from './html-comment';

class Foo {}

class Bar {
  nodeType = 10;
}

describe('html-comment snapshot serializer', () => {
  test('`serialize` function should return empty string', () => {
    expect(htmlComment.serialize()).toEqual('');
  });

  test('`test` function should return true when matching the condition', () => {
    class FooComment {
      nodeType = 8;
    }

    expect(htmlComment.test(new FooComment())).toBe(true);
  });

  test.each([undefined, {}, { nodeType: 8 }, new Foo(), new Bar()])(
    '`test` function should return false when not matching the condition',
    (value) => {
      expect(htmlComment.test(value)).toBe(false);
    },
  );
});
