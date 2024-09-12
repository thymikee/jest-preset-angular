import { Component, Inject, InjectionToken } from '@angular/core';

interface ServerError {
    title: string;
    errors: Map<string, string[]>;
}

export const DATA_TOKEN = new InjectionToken<ServerError>('DataToken');

@Component({
    standalone: true,
    selector: 'bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss'],
    // we have to setup styles this way, since simple styles/styleUrs properties will be removed (jest does not unit test styles)
    styles: [
        `
            p {
                color: red;
            }
        `,
    ],
})
export class BarComponent {
    constructor(@Inject(DATA_TOKEN) public data: ServerError) {}
}

@Component({
    standalone: true,
    selector: 'bar',
    templateUrl: `./bar.component.html`,
    styleUrl: `./bar.component.scss`,
    // we have to setup styles this way, since simple styles/styleUrs properties will be removed (jest does not unit test styles)
    styles: `
            p {
                color: red;
            }
        `,
})
export class StringStylesBarComponent {
    constructor(@Inject(DATA_TOKEN) public data: ServerError) {}
}
