import { async, fakeAsync, tick } from '@angular/core/testing';

describe('Async test', () => {
  test(
    'looks async but is synchronous',
    <any>fakeAsync((): void => {
      let flag = false;
      setTimeout(() => {
        flag = true;
      }, 100);
      expect(flag).toBe(false);
      tick(50);
      expect(flag).toBe(false);
      tick(50);
      expect(flag).toBe(true);
    })
  );

  test(
    'async should work',
    <any>async((): void => {
      let flag = false;
      setTimeout(() => {
        flag = true;
        expect(flag).toBe(true);
      }, 100);
    })
  );

  /*
 * This test doesn't work with jest-circus `testRunner`. If you want to test async with done callback, please use
 * testRunner `jest-jasmine2`.
 *
 * More information see discussion https://github.com/facebook/jest/issues/10529
 */
  // test('async with done should not work with jest-circus', async done => {
  //   let flag = false;
  //   setTimeout(() => {
  //     flag = true;
  //     expect(flag).toBe(true);
  //     done();
  //   }, 100);
  // });
})
