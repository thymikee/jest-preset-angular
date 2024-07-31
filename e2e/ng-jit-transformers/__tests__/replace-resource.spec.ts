import { TestBed } from '@angular/core/testing';

import { BarComponent, DATA_TOKEN } from '../bar.component';

test('templateUrl/styleUrls/styles should work', () => {
    TestBed.configureTestingModule({
        imports: [BarComponent],
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
});
