// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const jestCfgStub = {
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testRegex: ['(/__tests__/.*|(\\\\.|/)(test|spec))\\\\.[jt]sx?$'],
  globals: {
    'ts-jest': {
      diagnostics: {
        pretty: false,
      },
    },
  },
} as any; // eslint-disable-line @typescript-eslint/no-explicit-any
