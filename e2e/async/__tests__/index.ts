import { fakeAsync, tick, waitForAsync } from '@angular/core/testing';

test('fakeAsync should work', fakeAsync(() => {
  let flag = false;
  setTimeout(() => {
    flag = true;
  }, 100);
  expect(flag).toBe(false);
  tick(50);
  expect(flag).toBe(false);
  tick(50);
  expect(flag).toBe(true);
}));

test(
  'waitForAsync should work',
  waitForAsync(() => {
    let flag = false;
    setTimeout(() => {
      flag = true;
      expect(flag).toBe(true);
    }, 100);
  }),
);
