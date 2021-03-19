import { NgJestTransformer } from './ng-jest-transformer';

export default {
  createTransformer: (): NgJestTransformer => new NgJestTransformer(),
};
