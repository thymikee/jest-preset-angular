import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubCache } from './stub-cache';
import { stubDirective } from './stub-directive';

describe('stubDirective', () => {
    it('stub simple directive', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test.directive')>(
            './__fixtures__/test.directive',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test.directive')>(
            './__fixtures__/test.directive',
        );

        const cache = new StubCache();

        stubDirective(cache, actual.TestDirective, mock.TestDirective);

        @Component({
            template: '<div test></div>',
            imports: [mock.TestDirective],
            standalone: true,
        })
        class RootComponent {}

        const root = TestBed.createComponent(RootComponent);

        root.detectChanges();

        const testDirective = root.debugElement.query(By.directive(mock.TestDirective));

        expect(testDirective.injector.get(mock.TestDirective)).toBeTruthy();
    });

    it('reuse stubbed directive', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test.directive')>(
            './__fixtures__/test.directive',
        );
        const mock1 = jest.createMockFromModule<Readonly<typeof import('./__fixtures__/test.directive')>>(
            './__fixtures__/test.directive',
        );
        const mock2 = jest.createMockFromModule<Readonly<typeof import('./__fixtures__/test.directive')>>(
            './__fixtures__/test.directive',
        );

        const cache = new StubCache();

        stubDirective(cache, actual.TestDirective, mock1.TestDirective);
        stubDirective(cache, actual.TestDirective, mock2.TestDirective);

        expect(mock1.TestDirective.ɵdir).toBe(mock2.TestDirective.ɵdir);
    });

    it('stub directive with host directives', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test-with-host-directives.directive')>(
            './__fixtures__/test-with-host-directives.directive',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test-with-host-directives.directive')>(
            './__fixtures__/test-with-host-directives.directive',
        );
        const actualHostDirective = jest.requireActual<typeof import('./__fixtures__/test.directive')>(
            './__fixtures__/test.directive',
        );
        const mockHostDirective = jest.createMockFromModule<typeof import('./__fixtures__/test.directive')>(
            './__fixtures__/test.directive',
        );

        const cache = new StubCache();

        stubDirective(cache, actual.TestDirective, mock.TestDirective);
        stubDirective(cache, actualHostDirective.TestDirective, mockHostDirective.TestDirective);

        @Component({
            template: '<div test></div>',
            imports: [mock.TestDirective],
            standalone: true,
        })
        class RootComponent {}

        const root = TestBed.createComponent(RootComponent);

        root.detectChanges();

        const testDirective = root.debugElement.query(By.directive(mock.TestDirective));
        const testHostDirective = root.debugElement.query(By.directive(mockHostDirective.TestDirective));

        expect(testDirective.injector.get(mock.TestDirective)).toBeTruthy();
        expect(testHostDirective.injector.get(mockHostDirective.TestDirective)).toBeTruthy();
        expect(testDirective.nativeElement).toBe(testHostDirective.nativeElement);
    });

    it('stub directive with host directives that not imported', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test-with-host-directives.directive')>(
            './__fixtures__/test-with-host-directives.directive',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test-with-host-directives.directive')>(
            './__fixtures__/test-with-host-directives.directive',
        );

        const cache = new StubCache();

        stubDirective(cache, actual.TestDirective, mock.TestDirective);

        @Component({
            template: '<div test></div>',
            imports: [mock.TestDirective],
            standalone: true,
        })
        class RootComponent {}

        const root = TestBed.createComponent(RootComponent);

        root.detectChanges();

        const testDirective = root.debugElement.query(By.directive(mock.TestDirective));

        expect(testDirective.injector.get(mock.TestDirective)).toBeTruthy();
    });

    it('stub directive with signal inputs', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test-with-signal-inputs.directive')>(
            './__fixtures__/test-with-signal-inputs.directive',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test-with-signal-inputs.directive')>(
            './__fixtures__/test-with-signal-inputs.directive',
        );

        const cache = new StubCache();

        stubDirective(cache, actual.TestDirective, mock.TestDirective);

        @Component({
            template: '<div test [value1]="`test`" [value2]="`test`" [aValue3]="`test`" [aValue4]="`test`"></div>',
            imports: [mock.TestDirective],
            standalone: true,
        })
        class RootComponent {}

        jest.spyOn(console, 'error');

        expect(() => {
            TestBed.createComponent(RootComponent).detectChanges();
        }).not.toThrow();

        expect(console.error).not.toHaveBeenCalled();
    });

    it('stub directive with host directives that have inputs', () => {
        const actual = jest.requireActual<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.directive')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.directive');
        const mock = jest.createMockFromModule<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.directive')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.directive');
        const actualHostDirective = jest.requireActual<
            typeof import('./__fixtures__/test-with-signal-inputs.directive')
        >('./__fixtures__/test-with-signal-inputs.directive');
        const mockHostDirective = jest.createMockFromModule<
            typeof import('./__fixtures__/test-with-signal-inputs.directive')
        >('./__fixtures__/test-with-signal-inputs.directive');

        const cache = new StubCache();

        stubDirective(cache, actual.TestDirective, mock.TestDirective);
        stubDirective(cache, actualHostDirective.TestDirective, mockHostDirective.TestDirective);

        @Component({
            template: '<div test [value1]="`test`" [value2]="`test`" [aValue3]="`test`" [aValue4]="`test`"></div>',
            imports: [mock.TestDirective],
            standalone: true,
        })
        class RootComponent {}

        jest.spyOn(console, 'error');

        expect(() => {
            TestBed.createComponent(RootComponent).detectChanges();
        }).not.toThrow();

        expect(console.error).not.toHaveBeenCalled();
    });

    it('stub directive with host directives that have inputs and not imported', () => {
        const actual = jest.requireActual<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.directive')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.directive');
        const mock = jest.createMockFromModule<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.directive')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.directive');

        const cache = new StubCache();

        stubDirective(cache, actual.TestDirective, mock.TestDirective);

        @Component({
            template: '<div test [value1]="`test`" [value2]="`test`" [aValue3]="`test`" [aValue4]="`test`"></div>',
            imports: [mock.TestDirective],
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
