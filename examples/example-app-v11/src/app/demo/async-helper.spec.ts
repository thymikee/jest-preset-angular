import { fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { DoneFn } from '@jest/types/build/Circus';
import { interval, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';

describe('Angular async helper', () => {
  describe('async', () => {
    let actuallyDone = false;

    beforeEach(() => {
      actuallyDone = false;
    });

    it('should run normal test', () => {
      actuallyDone = true;
      expect(actuallyDone).toBeTruthy();
    });

    it('should run normal async test', () => {
      setTimeout(() => {
        actuallyDone = true;
        expect(actuallyDone).toBeTruthy();
      }, 0);
    });

    it(
      'should run async test with task (setTimeout)',
      waitForAsync(() => {
        setTimeout(() => {
          actuallyDone = true;
          expect(actuallyDone).toBeTruthy();
        }, 0);
      }),
    );

    it(
      'should run async test with task (clearInterval)',
      waitForAsync(() => {
        const id = setInterval(() => {
          actuallyDone = true;
          clearInterval(id);
          expect(actuallyDone).toBeTruthy();
        }, 100);
      }),
    );

    it(
      'should run async test with successful promise',
      waitForAsync(() => {
        const p = new Promise((resolve) => {
          setTimeout(resolve, 10);
        });
        p.then(() => {
          actuallyDone = true;
          expect(actuallyDone).toBeTruthy();
        });
      }),
    );

    it(
      'should run async test with failed promise',
      waitForAsync(() => {
        const p = new Promise((resolve, reject) => {
          setTimeout(reject, 10);
        });
        p.catch(() => {
          actuallyDone = true;
          // eslint-disable-next-line jest/no-conditional-expect
          expect(actuallyDone).toBeTruthy();
        });
      }),
    );

    // eslint-disable-next-line jest/no-done-callback
    it('should run async test with successful delayed Observable', (done: DoneFn) => {
      const source = of(true).pipe(delay(10));
      source.subscribe(
        () => (actuallyDone = true),
        // eslint-disable-next-line jest/no-jasmine-globals
        (err) => fail(err),
        () => {
          expect(actuallyDone).toBeTruthy();
          done();
        },
      );
    });

    it(
      'should run async test with successful delayed Observable (waitForAsync)',
      waitForAsync(() => {
        const source = of(true).pipe(delay(10));
        source.subscribe(
          () => (actuallyDone = true),
          // eslint-disable-next-line jest/no-jasmine-globals
          (err) => fail(err),
          () => {
            expect(actuallyDone).toBeTruthy();
          },
        );
      }),
    );

    it('should run async test with successful delayed Observable (fakeAsync)', fakeAsync(() => {
      const source = of(true).pipe(delay(10));
      source.subscribe(
        () => (actuallyDone = true),
        // eslint-disable-next-line jest/no-jasmine-globals
        (err) => fail(err),
        () => {
          expect(actuallyDone).toBeTruthy();
        },
      );

      tick(10);
    }));
  });

  describe('fakeAsync', () => {
    it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
      let called = false;
      setTimeout(() => {
        called = true;
      }, 100);
      tick(100);
      expect(called).toBe(true);
    }));

    it('should run new macro task callback with delay after call tick with millis', fakeAsync(() => {
      function nestedTimer(cb: () => unknown): void {
        setTimeout(() => setTimeout(() => cb()));
      }
      const callback = jest.fn();
      nestedTimer(callback);
      expect(callback).not.toHaveBeenCalled();
      tick(0);
      expect(callback).toHaveBeenCalled();
    }));

    it('should not run new macro task callback with delay after call tick with millis', fakeAsync(() => {
      function nestedTimer(cb: () => unknown): void {
        setTimeout(() => setTimeout(() => cb()));
      }
      const callback = jest.fn();
      nestedTimer(callback);
      expect(callback).not.toHaveBeenCalled();
      tick(0, { processNewMacroTasksSynchronously: false });
      expect(callback).not.toHaveBeenCalled();
      tick(0);
      expect(callback).toHaveBeenCalled();
    }));

    it('should get Date diff correctly in fakeAsync', fakeAsync(() => {
      const start = Date.now();
      tick(100);
      const end = Date.now();
      expect(end - start).toBe(100);
    }));

    it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
      let result = '';
      of('hello')
        .pipe(delay(1000))
        .subscribe((v) => {
          result = v;
        });
      expect(result).toBe('');
      tick(1000);
      expect(result).toBe('hello');

      const start = new Date().getTime();
      let dateDiff = 0;
      interval(1000)
        .pipe(take(2))
        .subscribe(() => (dateDiff = new Date().getTime() - start));

      tick(1000);
      expect(dateDiff).toBe(1000);
      tick(1000);
      expect(dateDiff).toBe(2000);
    }));
  });

  describe('test jsonp', () => {
    function jsonp(url: string, callback: () => void) {
      callback();
    }

    it(
      'should wait until promise.then is called',
      waitForAsync(() => {
        let finished = false;
        new Promise<void>((res) => {
          jsonp('localhost:8080/jsonp', () => {
            finished = true;
            res();
          });
        }).then(() => {
          expect(finished).toBe(true);
        });
      }),
    );
  });
});
