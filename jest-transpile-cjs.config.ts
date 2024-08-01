import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    globalSetup: './setup-e2e-test.ts',
    projects: ['jest-src.config.ts', 'e2e/**/jest-transpile-cjs.config.ts'],
};

export default config;
