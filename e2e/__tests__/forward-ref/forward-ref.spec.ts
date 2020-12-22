import { forwardRef, Inject, Injector } from '@angular/core';

const skipNg9 = process.env.NG_9 ? test.skip : test

skipNg9('forwardRef should work with ES2015 only with Angular 10+, Angular 9 works with ES5 only', () => {
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

  const injector = Injector.create({providers: [{provide: Lock, deps: []}, {provide: Door, deps: [Lock]}]});

  expect(injector.get(Door) instanceof Door).toBe(true);
  expect(injector.get(Door).lock instanceof Lock).toBe(true);
});
