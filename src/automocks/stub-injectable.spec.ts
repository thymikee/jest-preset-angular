import { TestBed } from '@angular/core/testing';

import { StubCache } from './stub-cache';
import { stubInjectable } from './stub-injectable';

describe('stubInjectable', () => {
    it('should stub root service', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/root.service')>('./__fixtures__/root.service');
        const mock =
            jest.createMockFromModule<typeof import('./__fixtures__/root.service')>('./__fixtures__/root.service');

        const cache = new StubCache();

        stubInjectable(cache, actual.RootService, mock.RootService);

        const service = TestBed.inject(mock.RootService);

        expect(jest.isMockFunction(service.method)).toBeTruthy();
    });

    it('should stub non root service', () => {
        const actual = jest.requireActual<typeof import('./__fixtures__/non-root.service')>(
            './__fixtures__/non-root.service',
        );
        const mock = jest.createMockFromModule<typeof import('./__fixtures__/non-root.service')>(
            './__fixtures__/non-root.service',
        );

        const cache = new StubCache();

        stubInjectable(cache, actual.NonRootService, mock.NonRootService);

        expect(() => TestBed.inject(mock.NonRootService)).toThrow();

        TestBed.resetTestingModule();

        TestBed.configureTestingModule({
            providers: [mock.NonRootService],
        });

        const service = TestBed.inject(mock.NonRootService);

        expect(jest.isMockFunction(service.method)).toBeTruthy();
    });
});
