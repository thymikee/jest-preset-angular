import { jest } from '@jest/globals';

import { getFoo } from './foo';

jest.mock('./foo');

console.log(getFoo());
