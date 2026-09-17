import path from 'node:path';

import { type CommandResult, getFixturePath, PROJECT_ROOT_DIR, runCommand } from './utils';

const JEST_PATH = path.join(PROJECT_ROOT_DIR, 'node_modules', 'jest', 'bin', 'jest.js');

export function runJest(fixtureName: string, configFile: string, args: string[] = []): Promise<CommandResult> {
    const fixturePath = getFixturePath(fixtureName);
    const configPath = path.join(fixturePath, configFile);
    const nodeFlags = configFile.includes('-esm.') ? ['--experimental-vm-modules', '--no-warnings'] : [];

    return runCommand(
        process.execPath,
        [...nodeFlags, JEST_PATH, '--config', configPath, '--runInBand', '--no-cache', ...args],
        fixturePath,
    );
}
