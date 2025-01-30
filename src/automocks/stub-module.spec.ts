import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubCache } from './stub-cache';
import { stubComponent } from './stub-component';
import { stubDirective } from './stub-directive';
import { stubModule } from './stub-module';
import { stubPipe } from './stub-pipe';

describe('stubModule', () => {
    it.each(['test-not-standalone', 'test'] as const)('stub simple module', (modulePath) => {
        const actual = jest.requireActual<{ TestModule: Type<object> }>(`./__fixtures__/${modulePath}.module`);
        const mock = jest.createMockFromModule<{ TestModule: Type<object> }>(`./__fixtures__/${modulePath}.module`);
        const actualComponent = jest.requireActual<{ TestComponent: Type<object> }>(
            `./__fixtures__/${modulePath}.component`,
        );
        const mockComponent = jest.createMockFromModule<{ TestComponent: Type<object> }>(
            `./__fixtures__/${modulePath}.component`,
        );
        const actualDirective = jest.requireActual<{ TestDirective: Type<object> }>(
            `./__fixtures__/${modulePath}.directive`,
        );
        const mockDirective = jest.createMockFromModule<{ TestDirective: Type<object> }>(
            `./__fixtures__/${modulePath}.directive`,
        );
        const actualPipe = jest.requireActual<{ TestPipe: Type<object> }>(`./__fixtures__/${modulePath}.pipe`);
        const mockPipe = jest.createMockFromModule<{ TestPipe: Type<object> }>(`./__fixtures__/${modulePath}.pipe`);

        const cache = new StubCache();

        stubModule(cache, actual.TestModule, mock.TestModule);
        stubComponent(cache, actualComponent.TestComponent, mockComponent.TestComponent);
        stubDirective(cache, actualDirective.TestDirective, mockDirective.TestDirective);
        stubPipe(cache, actualPipe.TestPipe, mockPipe.TestPipe);

        @Component({
            template: `
                <test></test>
                <div test>{{ 'value' | test }}</div>
            `,
            imports: [mock.TestModule],
            standalone: true,
        })
        class RootComponent {}

        jest.mocked(mockPipe.TestPipe).prototype.transform.mockImplementation((value: string) => `test ${value}`);

        const root = TestBed.createComponent(RootComponent);

        root.detectChanges();

        const testComponentElement = root.debugElement.query(By.directive(mockComponent.TestComponent));
        const testDirectiveElement = root.debugElement.query(By.directive(mockDirective.TestDirective));

        expect(testComponentElement).toBeTruthy();
        expect(testDirectiveElement).toBeTruthy();
        expect(testComponentElement.componentInstance).toBeInstanceOf(mockComponent.TestComponent);
        expect(testDirectiveElement.nativeElement.innerHTML).toBe('test value');
    });

    it('stub simple module with component that not imported', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test-not-standalone.module')>(
            './__fixtures__/test-not-standalone.module',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test-not-standalone.module')>(
            './__fixtures__/test-not-standalone.module',
        );

        const cache = new StubCache();

        stubModule(cache, actual.TestModule, mock.TestModule);

        @Component({
            template: '<test></test>',
            imports: [mock.TestModule],
            standalone: true,
        })
        class RootComponent {}

        jest.spyOn(console, 'error');

        expect(() => {
            TestBed.createComponent(RootComponent).detectChanges();
        }).not.toThrow();

        expect(console.error).not.toHaveBeenCalled();
    });
});
