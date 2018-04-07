import { Component, Input } from '@angular/core'

@Component({
  selector: 'zippy',
  template: `
    <div class="zippy">
      <div (click)="toggle()" class="zippy__title">
        <span class="arrow">{{ visible ? 'Close' : 'Open' }}</span> {{title}}
      </div>
      <div *ngIf="visible" class="zippy__content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ZippyComponent {

  @Input() title;
  visible = false;

  toggle() {
    this.visible = !this.visible;
  }
}
