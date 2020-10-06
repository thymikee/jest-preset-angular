import { mocked } from 'ts-jest/utils';

import * as _json from '../utils/json';
import { JsonableValue } from '../utils/jsonable-value';

jest.mock('../utils/json');

const { stringify } = mocked(_json);

stringify.mockImplementation((v) => JSON.stringify(v));

beforeEach(() => {
  jest.clearAllMocks();
});

test('should cache the serialized value', () => {
  const jv = new JsonableValue({ foo: 'bar' });

  expect(jv.serialized).toBe('{"foo":"bar"}');
  expect(stringify).toHaveBeenCalledTimes(1);
  expect(jv.serialized).toBe('{"foo":"bar"}');
  expect(stringify).toHaveBeenCalledTimes(1);
});

test('should update the serialized value when updating the value', () => {
  const jv = new JsonableValue({ foo: 'bar' } as Record<string, string>);

  expect(jv.serialized).toBe('{"foo":"bar"}');
  stringify.mockClear();
  jv.value = { bar: 'foo' };
  expect(jv.serialized).toBe('{"bar":"foo"}');
  expect(jv.serialized).toBe('{"bar":"foo"}');
  expect(stringify).toHaveBeenCalledTimes(1);
});
