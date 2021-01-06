import { forwardRef, Inject, Injector } from '@angular/core';

const shouldSkipTest = process.env.NG_VERSION === 'v9' || process.env.ISOLATED_MODULES === 'true';
const skipTest = shouldSkipTest ? test.skip : test;

if (shouldSkipTest) {
  process.stdout.write(
    '\nforwardRef only works in non-isolatedModules mode with ES2015 in Angular 10+, with Angular 9 requires ES5\n',
  );
}

skipTest('forwardRef should work', () => {
  class Door {
    lock: Lock;

    // Door attempts to inject Lock, despite it not being defined yet.
    // forwardRef makes this possible.
    constructor(@Inject(forwardRef(() => Lock)) lock: Lock) {
      this.lock = lock;
    }
  }

  // Only at this point Lock is defined.
  class Lock {}

  const injector = Injector.create({
    providers: [
      { provide: Lock, deps: [] },
      { provide: Door, deps: [Lock] },
    ],
  });

  // eslint-disable-next-line jest/no-standalone-expect
  expect(injector.get(Door) instanceof Door).toBe(true);
  // eslint-disable-next-line jest/no-standalone-expect
  expect(injector.get(Door).lock instanceof Lock).toBe(true);
});
