import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: '<h1>{{title}}</h1>',
  styles: ['h1 { color: green; font-size: 350%}'],
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
