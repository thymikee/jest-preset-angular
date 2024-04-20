import { UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { outputFromObservable, outputToObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

import { Hero } from '../model/hero';

@Component({
  selector: 'dashboard-hero',
  template: ` <div (click)="click()" class="hero">
    {{ hero().name | uppercase }}
  </div>`,
  styleUrls: ['./dashboard-hero.component.css'],
  standalone: true,
  imports: [UpperCasePipe],
})
export class DashboardHeroComponent {
  hero = input.required<Hero>();
  readonly selected = output<Hero>();
  private readonly selected$ = new Subject<Hero>();
  readonly selectedFromObservable = outputFromObservable(this.selected$);
  readonly selectedToObservable$ = outputToObservable(this.selected);

  click() {
    this.selected$.next(this.hero());
    this.selected.emit(this.hero());
  }
}
