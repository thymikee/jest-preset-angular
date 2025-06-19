import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'app-root',
    imports: [BannerComponent, WelcomeComponent, RouterOutlet, RouterLink],
    templateUrl: './app.html',
})
export class App implements OnInit {
    private readonly injectedDoc = inject(DOCUMENT);

    ngOnInit() {
        this.injectedDoc.title = 'Example App';
    }
}
