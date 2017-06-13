import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var require: any;
let image = require('../../assets/tiger.jpg');

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
      {{prop1}}
      another text node
    </p>
  `,
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  @Input() hasAClass = false;
  prop1: number;
  observable$: Observable<string>;

  constructor() {
    this.init();
    this.prop1 = 1337;
  }

  ngOnInit() {
  }

  init() {
    return 'Imma method';
  }
}
