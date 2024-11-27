import type { Config } from 'jest';

import snapshotSerializers from '../serializers';

type BasePresetConfig = Required<Pick<Config, 'testEnvironment' | 'moduleFileExtensions' | 'snapshotSerializers'>>;

export const basePresetConfig: BasePresetConfig = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    snapshotSerializers,
};
