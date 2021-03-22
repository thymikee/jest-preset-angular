import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-on-push',
  template: `
    <h3>{{ name }}</h3>
    <ul>
      <li *ngFor="let toppingName of toppings">{{ toppingName }}</li>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushComponent {
  @Input() name = '';
  @Input() toppings: string[] = [];
}
