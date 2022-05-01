import { Component } from '@angular/core';

import { Services } from './app-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private myService: Services.AppService) {}
}
