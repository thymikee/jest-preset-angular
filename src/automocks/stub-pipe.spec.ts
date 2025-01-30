import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { StubCache } from './stub-cache';
import { stubPipe } from './stub-pipe';

it('stubPipe', () => {
    const actual = jest.requireActual<typeof import('./__fixtures__/test.pipe')>('./__fixtures__/test.pipe');
    const mock = jest.createMockFromModule<typeof import('./__fixtures__/test.pipe')>('./__fixtures__/test.pipe');

    const cache = new StubCache();

    stubPipe(cache, actual.TestPipe, mock.TestPipe);

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
