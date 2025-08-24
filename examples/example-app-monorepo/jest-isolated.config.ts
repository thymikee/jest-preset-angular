/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

export default {
    projects: ['<rootDir>/apps/app1/jest-isolated.config.ts', '<rootDir>/libs/user/jest-isolated.config.ts'],
} satisfies Config;
