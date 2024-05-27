const baseJsTsConfig = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.eslint.json',
    },
    rules: {
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false }],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-readonly': 'error',
        curly: ['error', 'all'],
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-relative-packages': 'off',
        'import/no-unresolved': 'off',
        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc',
                },
                groups: ['builtin', 'external', ['internal', 'parent', 'sibling']],
                'newlines-between': 'always',
            },
        ],
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        'no-empty-function': 'off',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return',
            },
        ],
        'prettier/prettier': [
            'error',
            {
                singleAttributePerLine: true,
                printWidth: 120,
                singleQuote: true,
                tabWidth: 4,
                semi: true,
                trailingComma: 'all',
                parser: 'typescript',
            },
        ],
    },
};

module.exports = {
    env: {
        node: true,
        es2020: true,
    },
    overrides: [
        {
            ...baseJsTsConfig,
            files: ['*.ts', '*.js'],
            extends: [
                'plugin:@angular-eslint/recommended',
                'plugin:@angular-eslint/template/process-inline-templates',
                ...baseJsTsConfig.extends,
            ],
            rules: {
                ...baseJsTsConfig.rules,
                '@angular-eslint/component-class-suffix': 'off',
                '@angular-eslint/component-selector': 'off',
                '@angular-eslint/directive-selector': 'off',
                '@angular-eslint/no-input-rename': 'off',
            },
        },
        {
            files: ['*.html'],
            parser: '@angular-eslint/template-parser',
            extends: [
                'plugin:@angular-eslint/template/recommended',
                'plugin:@angular-eslint/template/accessibility',
                'plugin:prettier/recommended',
            ],
            rules: {
                'prettier/prettier': [
                    'error',
                    {
                        singleAttributePerLine: true,
                        printWidth: 120,
                        tabWidth: 4,
                        semi: false,
                        parser: 'angular',
                    },
                ],
            },
        },
        {
            ...baseJsTsConfig,
            files: ['*.spec.ts', 'e2e/**/__tests__/**/*.js'],
            extends: ['plugin:jest/recommended', ...baseJsTsConfig.extends],
        },
    ],
};
