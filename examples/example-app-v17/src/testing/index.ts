import { DebugElement } from '@angular/core';

export * from './async-observable-helpers';

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
