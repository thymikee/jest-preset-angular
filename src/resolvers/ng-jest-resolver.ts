import type { SyncResolver } from 'jest-resolve';

const ngJestResolver: SyncResolver = (path, options) => {
    return options.defaultResolver(path, {
        ...options,
        packageFilter(pkg) {
            return {
                ...pkg,
                main: pkg.main || pkg.es2015 || pkg.module,
            };
        },
    });
};

export = ngJestResolver;
