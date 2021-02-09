import * as ngJest from '..';
import { NgJestTransformer } from '../ng-jest-transformer';

describe('createTransformer', () => {
  it('should create different instances', () => {
    const tr1 = ngJest.createTransformer();
    const tr2 = ngJest.createTransformer();
    expect(tr1).toBeInstanceOf(NgJestTransformer);
    expect(tr2).toBeInstanceOf(NgJestTransformer);
    expect(tr1).not.toBe(tr2);
  });
});
