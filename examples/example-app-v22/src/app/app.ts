import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'app-root',
    imports: [BannerComponent, WelcomeComponent, RouterOutlet, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.html',
})
export class App implements OnInit {
    private readonly injectedDoc = inject(DOCUMENT);

    ngOnInit() {
        this.injectedDoc.title = 'Example App';
    }
}
