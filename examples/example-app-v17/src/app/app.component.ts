import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterLink, RouterOutlet, WelcomeComponent, BannerComponent],
})
export class AppComponent {}
