import ts from 'typescript';

import { normalizePath } from './paths';

export const augmentHostWithCaching = (host: ts.CompilerHost, cache: Map<string, ts.SourceFile>): void => {
  const baseGetSourceFile = host.getSourceFile;
  host.getSourceFile = function (fileName, languageVersion, onError, shouldCreateNewSourceFile, ...parameters) {
    if (!shouldCreateNewSourceFile && cache.has(fileName)) {
      return cache.get(fileName);
    }

    const file = baseGetSourceFile.call(host, fileName, languageVersion, onError, true, ...parameters);

    if (file) {
      cache.set(fileName, file);
    }

    return file;
  };
};

/**
 * Augments a TypeScript Compiler Host's resolveModuleNames function to collect dependencies
 * of the containing file passed to the resolveModuleNames function. This process assumes
 * that consumers of the Compiler Host will only call resolveModuleNames with modules that are
 * actually present in a containing file.
 * This process is a workaround for gathering a TypeScript SourceFile's dependencies as there
 * is no currently exposed public method to do so. A BuilderProgram does have a `getAllDependencies`
 * function.
 */
export const augmentHostWithDependencyCollection = (
  host: ts.CompilerHost,
  dependencies: Map<string, Set<string>>,
  moduleResolutionCache?: ts.ModuleResolutionCache,
): void => {
  if (host.resolveModuleNames) {
    const baseResolveModuleNames = host.resolveModuleNames;
    host.resolveModuleNames = function (moduleNames: string[], containingFile: string, ...parameters) {
      const results = baseResolveModuleNames.call(host, moduleNames, containingFile, ...parameters);

      const containingFilePath = normalizePath(containingFile);
      for (const result of results) {
        if (result) {
          const containingFileDependencies = dependencies.get(containingFilePath);
          if (containingFileDependencies) {
            containingFileDependencies.add(result.resolvedFileName);
          } else {
            dependencies.set(containingFilePath, new Set([result.resolvedFileName]));
          }
        }
      }

      return results;
    };
  } else {
    host.resolveModuleNames = function (
      moduleNames: string[],
      containingFile: string,
      _reusedNames: string[] | undefined,
      redirectedReference: ts.ResolvedProjectReference | undefined,
      options: ts.CompilerOptions,
    ) {
      return moduleNames.map((name) => {
        const result = ts.resolveModuleName(
          name,
          containingFile,
          options,
          host,
          moduleResolutionCache,
          redirectedReference,
        ).resolvedModule;

        if (result) {
          const containingFilePath = normalizePath(containingFile);
          const containingFileDependencies = dependencies.get(containingFilePath);
          if (containingFileDependencies) {
            containingFileDependencies.add(result.resolvedFileName);
          } else {
            dependencies.set(containingFilePath, new Set([result.resolvedFileName]));
          }
        }

        return result;
      });
    };
  }
};
