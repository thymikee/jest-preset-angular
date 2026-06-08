import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-banner',
    templateUrl: './banner-external.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./banner-external.component.css'],
})
export class BannerComponent {
    title = 'Test Tour of Heroes';
}
