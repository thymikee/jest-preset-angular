import nodePath from 'path';

const normalizationCache = new Map<string, string>();

export const normalizePath = (path: string): string => {
  let result = normalizationCache.get(path);

  if (result === undefined) {
    result = nodePath.win32.normalize(path).replace(/\\/g, nodePath.posix.sep);
    normalizationCache.set(path, result);
  }

  return result;
};
