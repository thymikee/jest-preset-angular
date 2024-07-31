import { Component, Inject, InjectionToken } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

interface ServerError {
    title: string;
    errors: Map<string, string[]>;
}

const DATA_TOKEN = new InjectionToken<ServerError>('DataToken');

@Component({
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
class BarComponent {
    constructor(@Inject(DATA_TOKEN) public data: ServerError) {}
}

test('templateUrl/styleUrls/styles should work', waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [BarComponent],
        providers: [
            {
                provide: DATA_TOKEN,
                useValue: {},
            },
        ],
    });
    const fixture = TestBed.createComponent(BarComponent);
    fixture.detectChanges();

    const elementToFind = fixture.debugElement.nativeElement.querySelector('p');
    expect(elementToFind).toBeDefined();
    expect(window.getComputedStyle(elementToFind).color).toEqual('');
    expect(window.getComputedStyle(elementToFind).fontSize).toEqual('');
}));
