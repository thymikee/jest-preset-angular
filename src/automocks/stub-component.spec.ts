import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubCache } from './stub-cache';
import { stubComponent } from './stub-component';
import { stubDirective } from './stub-directive';

describe('stubComponent', () => {
    it('stub simple component', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test.component')>(
            './__fixtures__/test.component',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test.component')>(
            './__fixtures__/test.component',
        );

        const cache = new StubCache();

        stubComponent(cache, actual.TestComponent, mock.TestComponent);

        @Component({
            template: '<test></test>',
            imports: [mock.TestComponent],
            standalone: true,
        })
        class RootComponent {}

        const root = TestBed.createComponent(RootComponent);

        root.detectChanges();

        const testComponent = root.debugElement.query(By.directive(mock.TestComponent));

        expect(testComponent.componentInstance).toBeInstanceOf(mock.TestComponent);
        expect(testComponent.nativeElement.innerHTML).toBe('');
    });

    it('reuse stubbed component', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test.component')>(
            './__fixtures__/test.component',
        );
        const mock1 = jest.createMockFromModule<Readonly<typeof import('./__fixtures__/test.component')>>(
            './__fixtures__/test.component',
        );
        const mock2 = jest.createMockFromModule<Readonly<typeof import('./__fixtures__/test.component')>>(
            './__fixtures__/test.component',
        );

        expect(mock1).not.toBe(mock2);

        const cache = new StubCache();

        stubComponent(cache, actual.TestComponent, mock1.TestComponent);
        stubComponent(cache, actual.TestComponent, mock2.TestComponent);

        expect(mock1.TestComponent.ɵcmp).toBe(mock2.TestComponent.ɵcmp);
    });

    it('stub component with host directives', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test-with-host-directives.component')>(
            './__fixtures__/test-with-host-directives.component',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test-with-host-directives.component')>(
            './__fixtures__/test-with-host-directives.component',
        );
        const actualDirective = jest.requireActual<typeof import('./__fixtures__/test.directive')>(
            './__fixtures__/test.directive',
        );
        const mockDirective = jest.createMockFromModule<typeof import('./__fixtures__/test.directive')>(
            './__fixtures__/test.directive',
        );

        const cache = new StubCache();

        stubComponent(cache, actual.TestComponent, mock.TestComponent);
        stubDirective(cache, actualDirective.TestDirective, mockDirective.TestDirective);

        @Component({
            template: '<test></test>',
            imports: [mock.TestComponent],
            standalone: true,
        })
        class RootComponent {}

        const root = TestBed.createComponent(RootComponent);

        root.detectChanges();

        const testComponent = root.debugElement.query(By.directive(mockDirective.TestDirective));

        expect(testComponent.componentInstance).toBeInstanceOf(mock.TestComponent);
        expect(testComponent.injector.get(mockDirective.TestDirective)).toBeTruthy();
    });

    it('stub component with host directives that not imported', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test-with-host-directives.component')>(
            './__fixtures__/test-with-host-directives.component',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test-with-host-directives.component')>(
            './__fixtures__/test-with-host-directives.component',
        );

        const cache = new StubCache();

        stubComponent(cache, actual.TestComponent, mock.TestComponent);

        @Component({
            template: '<test></test>',
            imports: [mock.TestComponent],
            standalone: true,
        })
        class RootComponent {}

        const root = TestBed.createComponent(RootComponent);

        root.detectChanges();

        const testComponent = root.debugElement.query(By.directive(mock.TestComponent));

        expect(testComponent.componentInstance).toBeInstanceOf(mock.TestComponent);
    });

    it('stub component with signal inputs', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test-with-signal-inputs.component')>(
            './__fixtures__/test-with-signal-inputs.component',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test-with-signal-inputs.component')>(
            './__fixtures__/test-with-signal-inputs.component',
        );

        const cache = new StubCache();

        stubComponent(cache, actual.TestComponent, mock.TestComponent);

        @Component({
            template: '<test [value1]="`test`" [value2]="`test`" [aValue3]="`test`" [aValue4]="`test`"></test>',
            imports: [mock.TestComponent],
            standalone: true,
        })
        class RootComponent {}

        jest.spyOn(console, 'error');

        expect(() => {
            TestBed.createComponent(RootComponent).detectChanges();
        }).not.toThrow();

        expect(console.error).not.toHaveBeenCalled();
    });

    it('stub component with host directives that have inputs', () => {
        const actual = jest.requireActual<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.component')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.component');
        const mock = jest.createMockFromModule<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.component')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.component');
        const actualHostDirective = jest.requireActual<
            typeof import('./__fixtures__/test-with-signal-inputs.directive')
        >('./__fixtures__/test-with-signal-inputs.directive');
        const mockHostDirective = jest.createMockFromModule<
            typeof import('./__fixtures__/test-with-signal-inputs.directive')
        >('./__fixtures__/test-with-signal-inputs.directive');

        const cache = new StubCache();

        stubComponent(cache, actual.TestComponent, mock.TestComponent);
        stubDirective(cache, actualHostDirective.TestDirective, mockHostDirective.TestDirective);

        @Component({
            template: '<test [value1]="`test`" [value2]="`test`" [aValue3]="`test`" [aValue4]="`test`"></test>',
            imports: [mock.TestComponent],
            standalone: true,
        })
        class RootComponent {}

        jest.spyOn(console, 'error');

        expect(() => {
            TestBed.createComponent(RootComponent).detectChanges();
        }).not.toThrow();

        expect(console.error).not.toHaveBeenCalled();
    });

    it('stub component with host directives that have inputs and not imported', () => {
        const actual = jest.requireActual<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.component')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.component');
        const mock = jest.createMockFromModule<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.component')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.component');

        const cache = new StubCache();

        stubComponent(cache, actual.TestComponent, mock.TestComponent);

        @Component({
            template: '<test [value1]="`test`" [value2]="`test`" [aValue3]="`test`" [aValue4]="`test`"></test>',
            imports: [mock.TestComponent],
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
