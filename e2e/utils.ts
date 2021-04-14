import semver from 'semver';

export const normalizeIcons = (str: string): string => {
  if (!str) {
    return str;
  }

  // Make sure to keep in sync with `jest-cli/src/constants`
  return str.replace(new RegExp('\u00D7', 'g'), '\u2715').replace(new RegExp('\u221A', 'g'), '\u2713');
};

export function onNodeVersions(versionRange: string, testBody: () => void): void {
  const description = `on node ${versionRange}`;
  if (semver.satisfies(process.versions.node, versionRange)) {
    // eslint-disable-next-line jest/valid-title
    describe(description, () => {
      testBody();
    });
  } else {
    // eslint-disable-next-line
    describe.skip(description, () => {
      testBody();
    });
  }
}
