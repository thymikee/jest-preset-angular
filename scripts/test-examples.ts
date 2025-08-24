import { join } from 'node:path';

import execa from 'execa';
import { copySync } from 'fs-extra';

import logger from './logger';
import { exampleAppsToRun, rootDir } from './paths';

const majorNodeVersion = parseInt(process.version.slice(1).split('.')[0], 10);

const executeTest = (projectPath: string) => {
    // we change current directory
    process.chdir(projectPath);

    // reading package.json
    const projectPkg = require(join(projectPath, 'package.json'));
    if (!projectPkg.name) {
        projectPkg.name = 'unknown';
    }
    if (!projectPkg.version) {
        projectPkg.version = 'unknown';
    }

    logger.log();

    logger.log('='.repeat(20), `${projectPkg.name}@${projectPkg.version}`, 'in', projectPath, '='.repeat(20));
    logger.log();

    // then we install it in the repo
    logger.log('ensuring all dependencies of target project are installed');
    logger.log();

    execa.sync('yarn', ['install'], { cwd: projectPath });
    logger.log();

    logger.log('installing bundled version of jest-preset-angular');
    logger.log();

    ['build', 'presets', 'jest-preset.js', 'package.json', 'setup-env'].forEach((asset) => {
        const assetToReplace = join(projectPath, 'node_modules', 'jest-preset-angular', asset);
        const assetToCopy = join(rootDir, asset);
        copySync(assetToCopy, assetToReplace, {});
    });

    // then we can run the tests
    const cmdLine = ['yarn', majorNodeVersion === 22 ? 'test-22' : 'test'];
    const cmdIsolatedLine = ['yarn', majorNodeVersion === 22 ? 'test-isolated-22' : 'test-isolated'];
    const cmdESMLine = ['yarn', majorNodeVersion === 22 ? 'test-esm-22' : 'test-esm'];
    const cmdESMIsolatedLine = ['yarn', majorNodeVersion === 22 ? 'test-esm-isolated-22' : 'test-esm-isolated'];

    logger.log('starting the CommonJS tests with isolatedModules: false using:', ...cmdLine);
    logger.log();

    execa.sync(cmdLine.shift() ?? 'yarn', cmdLine, {
        cwd: projectPath,
        stdio: 'inherit',
        env: process.env,
    });

    logger.log();
    logger.log('starting the CommonJS tests with isolatedModules: true using:', ...cmdIsolatedLine);
    logger.log();

    execa.sync(cmdIsolatedLine.shift() ?? 'yarn', cmdIsolatedLine, {
        cwd: projectPath,
        stdio: 'inherit',
        env: process.env,
    });

    logger.log();
    logger.log('starting the ESM tests with isolatedModules: false using:', ...cmdESMLine);
    logger.log();

    execa.sync(cmdESMLine.shift() ?? 'yarn', cmdESMLine, {
        cwd: projectPath,
        stdio: 'inherit',
        env: process.env,
    });

    logger.log();
    logger.log('starting the ESM tests with isolatedModules: true using:', ...cmdESMIsolatedLine);
    logger.log();

    execa.sync(cmdESMIsolatedLine.shift() ?? 'yarn', cmdESMIsolatedLine, {
        cwd: projectPath,
        stdio: 'inherit',
        env: process.env,
    });
};

// This will trigger the build as well (not using yarn since yarn pack is buggy)
logger.log('creating jest-preset-angular bundle');

execa.sync('yarn', ['build']);

exampleAppsToRun.forEach((projectPath) => {
    executeTest(projectPath);
});
