import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SomeService } from 'external-lib';

import { MyComponent } from './my.component';

jest.mock('external-lib');

describe('MyComponent', () => {
    let fixture: ComponentFixture<MyComponent>;
    let someService: jest.Mocked<SomeService>;

    beforeEach(() => {
        someService = jest.mocked(TestBed.inject(SomeService));

        fixture = TestBed.createComponent(MyComponent);
        fixture.detectChanges();
    });

    describe('on button click', () => {
        beforeEach(() => {
            fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
        });

        it('should call doSomething on SomeService', () => {
            expect(someService.doSomething).toHaveBeenCalled();
        });
    });
});
