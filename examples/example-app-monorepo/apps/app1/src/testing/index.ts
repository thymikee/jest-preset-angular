import { DebugElement } from '@angular/core';
import { tick, ComponentFixture } from '@angular/core/testing';

export * from './activated-route-stub';
export * from './router-link-directive-stub';

export function advance(f: ComponentFixture<unknown>): void {
  tick();
  f.detectChanges();
}

interface IButtonClickEvent {
  button: number;
}

export const ButtonClickEvents: {
  left: IButtonClickEvent;
  right: IButtonClickEvent;
} = {
  left: { button: 0 },
  right: { button: 2 },
};

export function click(el: DebugElement | HTMLElement, eventObj: IButtonClickEvent = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
