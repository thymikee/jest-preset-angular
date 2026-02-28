import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalFormTestComponent } from './signal-form-test.component';

describe('SignalFormTestComponent', () => {
    let fixture: ComponentFixture<SignalFormTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignalFormTestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SignalFormTestComponent);
        fixture.detectChanges();
    });

    it('should match snapshot with Signal Form', () => {
        // This test should not throw "TypeError: Cannot convert object to primitive value"
        expect(fixture).toMatchSnapshot();
    });
});
