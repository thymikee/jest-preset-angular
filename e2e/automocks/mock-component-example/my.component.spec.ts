import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SomeComponent } from 'external-lib';

import { MyComponent } from './my.component';

jest.mock('external-lib');

describe('MyComponent', () => {
    let fixture: ComponentFixture<MyComponent>;
    let component: MyComponent;

    beforeEach(() => {
        fixture = TestBed.createComponent(MyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('if isVisible is true', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('isVisible', true);
            fixture.detectChanges();
        });

        it('should render SomeComponent', () => {
            expect(fixture.debugElement.query(By.directive(SomeComponent))).toBeTruthy();
        });

        describe('on helloWorld event', () => {
            beforeEach(() => {
                jest.spyOn(component, 'onHelloWorld');

                fixture.debugElement.query(By.directive(SomeComponent)).triggerEventHandler('helloWorld', 'hello');
            });

            it('should call onHelloWorld', () => {
                expect(component.onHelloWorld).toHaveBeenCalledWith('hello');
            });
        });
    });

    describe('if isVisible is false', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('isVisible', false);
            fixture.detectChanges();
        });

        it('should not render SomeComponent', () => {
            expect(fixture.debugElement.query(By.directive(SomeComponent))).toBeFalsy();
        });
    });
});
