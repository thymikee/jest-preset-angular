import { createRequire } from 'node:module';

import eslint from '@eslint/js';
import angularEslint from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const createRequireESM = createRequire(import.meta.url);
const prettierConfig = createRequireESM('./.prettierrc.json');

export default tseslint.config(
    {
        ignores: [
            '**/dist',
            '**/node_modules',
            '**/coverage',
            '**/build',
            '**/.yarn',
            'website/.docusaurus',
            'src/transformers/jit_transform.js',
        ],
    },
    eslint.configs.recommended,
    tseslint.configs.strict,
    importPlugin.flatConfigs.recommended,
    jestPlugin.configs['flat/recommended'],
    eslintConfigPrettier,
    eslintPrettier,
    {
        files: ['**/*.{js,cjs,mjs}'],
        languageOptions: {
            globals: {
                ...globals.node,
                globalThis: false,
            },
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            'jest/no-conditional-expect': 'off',
            'import/default': 'off',
        },
    },
    {
        files: ['**/*.{js,cjs,mjs,ts,mts,cts,tsx}'],
        plugins: {
            jsdoc: jsdocPlugin,
        },
        rules: {
            '@typescript-eslint/no-extraneous-class': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'import/no-unresolved': 'off',
            'import/order': [
                'error',
                {
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    // this is the default order except for added `internal` in the middle
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                },
            ],
            'no-unused-vars': 'off',
            'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
            'prettier/prettier': [
                'error',
                {
                    ...prettierConfig,
                    tabWidth: 4,
                },
            ],
        },
    },
    {
        files: ['examples/**/*.ts'],
        extends: [...angularEslint.configs.tsRecommended],
        processor: angularEslint.processInlineTemplates,
        rules: {
            '@angular-eslint/component-class-suffix': 'off',
            '@angular-eslint/component-selector': 'off',
            '@angular-eslint/directive-selector': 'off',
            '@angular-eslint/no-input-rename': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
);
