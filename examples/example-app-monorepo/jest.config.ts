/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

export default {
    projects: ['<rootDir>/apps/app1', '<rootDir>/libs/user'],
} satisfies Config;
