import { Component, ElementRef } from '@angular/core';

import { DisableableDirective } from './disableable.directive';

@Component({
  selector: 'lib-my-lib',
  template: ` <p>my-lib works!</p> `,
  styles: [],
})
export class MyLibComponent extends DisableableDirective {
  constructor(public elementRef: ElementRef) {
    super(elementRef);
  }

  toggle(): void {
    if (!super.disabled) {
      console.log('test');
    }
  }
}
