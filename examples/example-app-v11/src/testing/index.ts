import { DebugElement } from '@angular/core';
import { tick, ComponentFixture } from '@angular/core/testing';

export * from './activated-route-stub';
export * from './router-link-directive-stub';

export function advance(f: ComponentFixture<any>): void {
  tick();
  f.detectChanges();
}

export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 },
};

export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
