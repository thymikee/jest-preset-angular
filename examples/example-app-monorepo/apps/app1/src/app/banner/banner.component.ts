import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: '<h1>{{title}}</h1>',
  styles: ['h1 { color: green; font-size: 350%}'],
  standalone: true,
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}
