import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-component',
  template: `
    <div class="child">
      {{ someInput }}
      <div>
        rly
        <p>complex</p>
        <div>
          component
          <div>oh my god!</div>
        </div>
      </div>
    </div>
  `,
})
export class ChildComponent {
  @Input() someInput = null;
}
