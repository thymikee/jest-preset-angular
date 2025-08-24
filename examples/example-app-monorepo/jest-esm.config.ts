/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

export default {
    projects: ['<rootDir>/apps/app1/jest-esm.config.ts', '<rootDir>/libs/user/jest-esm.config.ts'],
} satisfies Config;
