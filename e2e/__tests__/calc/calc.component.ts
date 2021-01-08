import { Component, Input } from '@angular/core';

import image from './its_something.png';

@Component({
  selector: 'app-calc',
  template: `
    <p
      class="a-default-class"
      [ngClass]="{
        'a-class': hasAClass
      }"
    >
      calc works!
      {{ prop1 }}
      another text node
      {{ image }}
    </p>
  `,
})
export class CalcComponent {
  @Input() hasAClass = false;
  prop1: number;
  image: string;

  constructor() {
    this.init();
    this.prop1 = 1337;
    this.image = image;
  }

  init(): string {
    return 'Imma method';
  }
}
