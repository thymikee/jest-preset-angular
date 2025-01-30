import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { stubAnything } from './stub-anything';
import { StubCache } from './stub-cache';

const wrappers = [
    (value: unknown) => value,
    (value: unknown) => [value],
    (value: unknown) => ({ value }),
    (value: unknown) => [{ value }],
];

describe('stubAnything', () => {
    it.each(wrappers)('should stub root service', (wrap) => {
        const actual = jest.requireActual<typeof import('./__fixtures__/root.service')>('./__fixtures__/root.service');
        const mock =
            jest.createMockFromModule<typeof import('./__fixtures__/root.service')>('./__fixtures__/root.service');

        const cache = new StubCache();

        stubAnything(cache, wrap(actual.RootService), wrap(mock.RootService));

        const service = TestBed.inject(mock.RootService);

        expect(jest.isMockFunction(service.method)).toBeTruthy();
    });

    it.each(wrappers)('should stub pipe', (wrap) => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test.pipe')>('./__fixtures__/test.pipe');
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test.pipe')>('./__fixtures__/test.pipe');

        const cache = new StubCache();

        stubAnything(cache, wrap(actual.TestPipe), wrap(mock.TestPipe));

        @Component({
            template: '{{value() | test}}',
            imports: [mock.TestPipe],
        })
        class RootComponent {
            public readonly value = signal('value');
        }

        const root = TestBed.createComponent(RootComponent);

        root.detectChanges();

        expect(root.debugElement.nativeElement.innerHTML).toBe('');

        root.componentInstance.value.set('test');
        jest.mocked(mock.TestPipe.prototype.transform).mockImplementation(() => 'stub value');

        root.detectChanges();

        expect(root.debugElement.nativeElement.innerHTML).toBe('stub value');
    });

    it.each(wrappers)('stub directive with host directives that have inputs', (wrap) => {
        const actual = jest.requireActual<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.directive')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.directive');
        const mock = jest.createMockFromModule<
            typeof import('./__fixtures__/test-with-host-directives-with-signal-inputs.directive')
        >('./__fixtures__/test-with-host-directives-with-signal-inputs.directive');

        const cache = new StubCache();

        stubAnything(cache, wrap(actual.TestDirective), wrap(mock.TestDirective));

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

    it.each(wrappers)('stub component with signal inputs', (wrap) => {
        const actual = jest.requireActual<typeof import('./__fixtures__/test-with-signal-inputs.component')>(
            './__fixtures__/test-with-signal-inputs.component',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/test-with-signal-inputs.component')>(
            './__fixtures__/test-with-signal-inputs.component',
        );

        const cache = new StubCache();

        stubAnything(cache, wrap(actual.TestComponent), wrap(mock.TestComponent));

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
