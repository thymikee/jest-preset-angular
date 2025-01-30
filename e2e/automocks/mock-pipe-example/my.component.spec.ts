import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SomePipe } from 'external-lib';

import { MyComponent } from './my.component';

jest.mock('external-lib');

describe('MyComponent', () => {
    let fixture: ComponentFixture<MyComponent>;
    let component: MyComponent;

    beforeEach(() => {
        jest.mocked(SomePipe).prototype.transform.mockReturnValue('transformed');

        fixture = TestBed.createComponent(MyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render transformed value', () => {
        expect(fixture.nativeElement.textContent).toBe('transformed');
    });

    describe('if value changes', () => {
        beforeEach(() => {
            component.value.set('new value');
            jest.mocked(SomePipe).prototype.transform.mockReturnValue('new transformed');
            fixture.detectChanges();
        });

        it('should render new transformed value', () => {
            expect(fixture.nativeElement.textContent).toBe('new transformed');
        });
    });
});
