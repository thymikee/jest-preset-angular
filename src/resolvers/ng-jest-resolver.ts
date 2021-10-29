import type { Config } from '@jest/types';

const ngJestResolver = (
  path: Config.Path,
  // `jest-resolve` didn't expose `ResolverOptions` type
  options: { defaultResolver: (path: string, options: Record<string, unknown>) => string },
): Config.Path =>
  options.defaultResolver(path, {
    ...options,
    packageFilter: (pkg: Record<string, unknown>) => ({
      ...pkg,
      main: pkg.main || pkg.es2015 || pkg.module,
    }),
  });

export = ngJestResolver;
