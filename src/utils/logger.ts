import { createLogger, LogContexts, LogLevels } from 'bs-logger';

const ngJestLogger = createLogger({
  context: {
    [LogContexts.package]: 'jest-preset-angular',
    [LogContexts.logLevel]: LogLevels.trace,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    version: require('../../package.json').version,
  },
  targets: process.env.NG_JEST_LOG ?? undefined,
});

export { ngJestLogger };
