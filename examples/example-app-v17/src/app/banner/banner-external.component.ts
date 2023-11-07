import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner-external.component.html',
  styleUrls: ['./banner-external.component.css'],
  standalone: true,
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}
