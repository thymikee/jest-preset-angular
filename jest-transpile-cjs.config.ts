import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    globalSetup: './e2e/global-setup.ts',
    projects: ['jest-src.config.ts', 'e2e/**/jest-transpile-cjs.config.ts'],
};

export default config;
