import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-banner',
  templateUrl: './banner-external.component.html',
  styleUrls: ['./banner-external.component.css'],
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}
