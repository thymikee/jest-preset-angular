import { Component } from '@angular/core';

@Component({
  selector: 'app-a-bit-more-complex',
  template: `
    <div class="some-wrapper-class">
      diary works!
      <div *ngIf="someVar" class="inner-class">
        <div *ngIf="anotherVar" class="inner-hidden"></div>
        <div>another case</div>
        <span>some html</span>
      </div>
      <div>one more case case</div>
      <div><app-child-component someInput="someVar"></app-child-component></div>
    </div>
  `
})
export class ABitMoreComplexComponent {
  someVar = true;
  anotherVar = false;
}
