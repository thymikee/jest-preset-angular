import type { SyncResolver } from 'jest-resolve';

const ngJestResolver: SyncResolver = (path, options) => {
    return options.defaultResolver(path, {
        ...options,
        // @ts-expect-error todo drop after end support of jest 29
        packageFilter(pkg) {
            return {
                ...pkg,
                main: pkg.main || pkg.es2015 || pkg.module,
            };
        },
    });
};

export = ngJestResolver;
