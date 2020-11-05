import { getFoo } from './foo';

jest.mock('./foo');

console.log(getFoo());
