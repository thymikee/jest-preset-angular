// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setupZonelessTestEnv = (_options) => {
    throw Error(
        'Zoneless testing environment only works when running Jest in ESM mode with Jest 29. ' +
            'Jest 30+ will support to work with CommonJS mode.',
    );
};

module.exports = {
    setupZonelessTestEnv,
};
