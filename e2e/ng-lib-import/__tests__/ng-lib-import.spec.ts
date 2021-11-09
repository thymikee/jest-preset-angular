import { MyLibService } from 'my-lib';

test('should pass', () => {
  expect(new MyLibService()).toBeInstanceOf(MyLibService);
});
