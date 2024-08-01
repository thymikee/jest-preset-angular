import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    globalSetup: './setup-e2e-test.ts',
    projects: ['e2e/**/jest-transpile-esm.config.ts'],
};

export default config;
