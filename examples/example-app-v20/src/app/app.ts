import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'app-root',
    imports: [BannerComponent, WelcomeComponent, RouterOutlet, RouterLink],
    templateUrl: './app.html',
})
export class App {

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() {
        const injectedDoc = inject<Document>(DOCUMENT);

        injectedDoc.title = 'Example App';
    }
}
