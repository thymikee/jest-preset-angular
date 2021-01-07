import { NgJestTransformer } from './ng-jest-transformer';

export function createTransformer(): NgJestTransformer {
  return new NgJestTransformer();
}
