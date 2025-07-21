import type { Config } from 'jest';

import snapshotSerializers from '../serializers';

export type JSDOMEnvironment = 'jsdom' | 'jest-preset-angular/environments/jest-jsdom-env';

type BasePresetConfig = {
    testEnvironment: JSDOMEnvironment;
    moduleFileExtensions: Config['moduleFileExtensions'];
    snapshotSerializers: Config['snapshotSerializers'];
};

export const basePresetConfig: BasePresetConfig = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    snapshotSerializers,
};
