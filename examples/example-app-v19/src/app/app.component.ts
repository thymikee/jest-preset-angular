import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [BannerComponent, WelcomeComponent, RouterOutlet, RouterLink],
})
export class AppComponent implements OnInit {
    private readonly injectedDoc = inject(DOCUMENT);

    ngOnInit() {
        this.injectedDoc.title = 'Example App';
    }
}
