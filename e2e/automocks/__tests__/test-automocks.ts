import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import * as testManualMockComponent from '../test-manual-mock.component';
import * as testModule from '../test.module';

jest.mock('../test.module');
jest.mock('../test-manual-mock.component');

it('should mock module', () => {
    @Component({
        template: `
            <test [value]="'value'">{{ 'test' | test }}</test>
            <div test [value]="'value'">{{ 'test' | test }}</div>
        `,
        imports: [testModule.TestModule],
    })
    class TestComponent {}

    jest.spyOn(console, 'error');

    expect(() => TestBed.createComponent(TestComponent).detectChanges()).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
});

it('should ignore modules with manual mock', () => {
    const fixture = TestBed.createComponent(testManualMockComponent.TestComponent);

    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.innerHTML).toBe('this is a manual mock for test');
    expect(jest.isMockFunction(fixture.componentInstance.method)).toBeFalsy();
});
