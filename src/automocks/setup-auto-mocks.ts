import { version } from 'jest/package.json';

import { stubAnything } from './stub-anything';
import { StubCache } from './stub-cache';

export function setupAutoMocks(): void {
    const cache = new StubCache();

    if (Number(version.split('.')[0]) < 30) {
        throw new Error('This function requires `jest>=30`. Please upgrade jest package.');
    }

    jest.onGenerateMock((modulePath: string, moduleMock: unknown) => {
        const moduleActual = jest.requireActual(modulePath);

        stubAnything(cache, moduleActual, moduleMock);

        return moduleMock;
    });
}
