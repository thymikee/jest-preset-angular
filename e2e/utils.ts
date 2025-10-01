import * as semver from 'semver';

export const onNodeVersions = (versionRange: string, testBody: () => void): void => {
    const description = `on node ${versionRange}`;
    if (semver.satisfies(process.versions.node, versionRange)) {
        // eslint-disable-next-line jest/valid-title
        describe(description, () => {
            testBody();
        });
    } else {
        // eslint-disable-next-line jest/valid-title,jest/no-disabled-tests
        describe.skip(description, () => {
            testBody();
        });
    }
};
