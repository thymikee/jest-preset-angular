import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
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
