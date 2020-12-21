import { Component, ElementRef, OnInit } from '@angular/core';

import { DisableableDirective } from './disableable.directive';

@Component({
  selector: 'lib-my-lib',
  template: `
    <p>
      my-lib works!
    </p>
  `,
  styles: [
  ]
})
export class MyLibComponent extends DisableableDirective implements OnInit {

  constructor(public elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnInit(): void {
  }

  toggle(): void {
    if (!super.disabled) {
      console.log('test');
    }
  }
}
