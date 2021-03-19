import ngJest from '../';
import { NgJestTransformer } from '../ng-jest-transformer';

test('should create an instance of NgJestTransformer', () => {
  expect(ngJest.createTransformer()).toBeInstanceOf(NgJestTransformer);
});
