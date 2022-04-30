import type { ResolverOptions } from 'jest-resolve';

import ngJestResolver from './ng-jest-resolver';

test.each([
  { version: '1.0.0', main: 'index.js' },
  { version: '1.0.0', es2015: 'index.js' },
  { version: '1.0.0', module: 'index.js' },
])('should set `main` field with the value from `main/es2015/module` field', (value) => {
  const mockedDefaultResolver = jest.fn();

  ngJestResolver('foo', {
    defaultResolver: mockedDefaultResolver,
  } as unknown as ResolverOptions);

  expect(mockedDefaultResolver).toHaveBeenCalled();
  expect(mockedDefaultResolver.mock.calls[0][0]).toEqual('foo');
  expect(mockedDefaultResolver.mock.calls[0][1].packageFilter(value)).toEqual({
    ...value,
    main: 'index.js',
  });
});
