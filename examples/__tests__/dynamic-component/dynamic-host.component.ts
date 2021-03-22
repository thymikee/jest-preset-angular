import { Component } from '@angular/core';

import { DynamicButtonComponent } from './dynamic-button.component';

@Component({
  selector: 'app-dynamic-host',
  template: ` <ng-container [ngComponentOutlet]="dynamicComponentType"></ng-container> `,
})
export class DynamicHostComponent {
  dynamicComponentType = DynamicButtonComponent;
}
