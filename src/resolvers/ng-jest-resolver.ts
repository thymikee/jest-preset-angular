const ngJestResolver = (
  path: string,
  // `jest-resolve` didn't expose `ResolverOptions` type
  options: { defaultResolver: (path: string, options: Record<string, unknown>) => string },
): string =>
  options.defaultResolver(path, {
    ...options,
    packageFilter: (pkg: Record<string, unknown>) => ({
      ...pkg,
      main: pkg.main || pkg.es2015 || pkg.module,
    }),
  });

export = ngJestResolver;
