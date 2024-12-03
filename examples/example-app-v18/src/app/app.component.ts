import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { of } from 'rxjs';

import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [BannerComponent, WelcomeComponent, RouterOutlet, RouterLink],
})
export class AppComponent {
    constructor() {
        console.warn(toSignal(of([])));
    }
}
