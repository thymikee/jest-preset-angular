import { Component } from '@angular/core';

@Component({
  selector: 'app-simple-with-styles',
  templateUrl: './simple-with-styles.component.html',
  // we have to setup styles this way, since simple styles/styleUrs properties will be removed (jest does not unit test styles)
  styles: [`
    .some-class { color: red }
  `]
})
export class SimpleWithStylesComponent {}
