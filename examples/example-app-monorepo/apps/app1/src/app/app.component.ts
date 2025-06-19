import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [BannerComponent, WelcomeComponent, RouterOutlet, RouterLink],
})
export class AppComponent {
    injectDoc = inject(DOCUMENT);
    constructor() {
        this.injectDoc.title = 'Example App';
    }
}
