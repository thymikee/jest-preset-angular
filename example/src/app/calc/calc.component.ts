import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
    </p>
  `,
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  @Input() hasAClass;
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
