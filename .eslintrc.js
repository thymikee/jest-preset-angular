module.exports = {
  env: {
    node: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "extends": [
        "eslint:recommended",
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:jest/recommended',
        'plugin:prettier/recommended'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module',
        impliedStrict: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
      plugins: ['@typescript-eslint', 'jest', 'jsdoc'],
    }
  ],
  plugins: ['jest', 'jsdoc'],
  rules: {
    'padding-line-between-statements': [
      "error",
      { blankLine: "always", prev: "*", next: "return" }
    ],
  },
  settings: {},
}
