import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    globalSetup: './e2e/global-setup.ts',
    projects: ['e2e/**/jest-esm.config.ts'],
};

export default config;
