import { UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { Hero } from '../model';

@Component({
  standalone: true,
  selector: 'dashboard-hero',
  template: `
    <button type="button" (click)="click()" class="hero">
      {{ hero().name | uppercase }}
    </button>
  `,
  styleUrls: ['./dashboard-hero.component.css'],
  imports: [UpperCasePipe],
})
export class DashboardHeroComponent {
  hero = input.required<Hero>();
  readonly selected = output<Hero>();

  click() {
    this.selected.emit(this.hero());
  }
}
