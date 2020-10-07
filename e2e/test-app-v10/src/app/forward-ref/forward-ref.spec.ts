import { forwardRef, Inject, ReflectiveInjector } from '@angular/core';

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

test('should work', () => {
  const injector = ReflectiveInjector.resolveAndCreate([Door, Lock]);
  const door = injector.get(Door);
  expect(door instanceof Door).toBeTruthy();
  expect(door.lock instanceof Lock).toBeTruthy();
});
