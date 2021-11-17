import { NgJestTransformer } from './ng-jest-transformer';

import ngJest from './';

test('should create an instance of NgJestTransformer', () => {
  expect(ngJest.createTransformer()).toBeInstanceOf(NgJestTransformer);
});
