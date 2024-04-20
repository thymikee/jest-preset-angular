import { UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

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

  click() {
    this.selected.emit(this.hero());
  }
}
