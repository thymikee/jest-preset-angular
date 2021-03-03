import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-button',
  template: ` <button (click)="onClick()">Hello</button> `,
})
export class DynamicButtonComponent {
  onClick(): void {
    console.log('Click!');
  }
}
