import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-banner',
    template: '<h1>{{title}}</h1>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: ['h1 { color: green; font-size: 350%}'],
})
export class BannerComponent {
    title = 'Test Tour of Heroes';
}
