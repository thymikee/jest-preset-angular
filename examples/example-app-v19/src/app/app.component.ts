import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [BannerComponent, WelcomeComponent, RouterOutlet, RouterLink],
})
export class AppComponent {
    constructor(@Inject(DOCUMENT) injectedDoc: Document) {
        injectedDoc.title = 'Example App';
    }
}
