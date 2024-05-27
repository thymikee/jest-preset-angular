import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

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
class BarComponent {}

test('templateUrl/styleUrls/styles should work', waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [BarComponent],
    });
    const fixture = TestBed.createComponent(BarComponent);
    fixture.detectChanges();

    const elementToFind = fixture.debugElement.nativeElement.querySelector('p');
    expect(elementToFind).toBeDefined();
    expect(window.getComputedStyle(elementToFind).color).toEqual('');
    expect(window.getComputedStyle(elementToFind).fontSize).toEqual('');
}));
