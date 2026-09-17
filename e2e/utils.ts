import { existsSync } from 'node:fs';
import path from 'node:path';

import execa from 'execa';

import { packageManager } from '../package.json';

export const E2E_ROOT_DIR = __dirname;
export const PROJECT_ROOT_DIR = path.resolve(E2E_ROOT_DIR, '..');
export const INSTALL_TIMEOUT = 300_000;

export interface CommandResult {
    exitCode: number;
    stdout: string;
    stderr: string;
}

export function getFixturePath(fixtureName: string): string {
    const fixturePath = path.join(E2E_ROOT_DIR, fixtureName);
    if (!existsSync(path.join(fixturePath, 'package.json'))) {
        throw new Error(`Missing fixture package.json: ${fixturePath}`);
    }

    return fixturePath;
}

export async function runCommand(
    command: string,
    args: string[],
    cwd = PROJECT_ROOT_DIR,
    timeout = 120_000,
): Promise<CommandResult> {
    const result = await execa(command, args, { cwd, timeout, reject: false });

    return {
        exitCode: result.exitCode ?? 1,
        stdout: result.stdout,
        stderr: [result.stderr, result.failed ? result.shortMessage : ''].filter(Boolean).join('\n'),
    };
}

export async function runYarnInstall(fixtureName: string): Promise<void> {
    const fixturePath = getFixturePath(fixtureName);
    if (!existsSync(path.join(fixturePath, 'yarn.lock'))) {
        throw new Error(`Missing fixture yarn.lock: ${fixturePath}`);
    }
    const yarnVersion = packageManager.split('@')[1];
    const yarnPath = path.join(PROJECT_ROOT_DIR, '.yarn', 'releases', `yarn-${yarnVersion}.cjs`);
    const result = await runCommand(
        process.execPath,
        [yarnPath, 'install', '--immutable'],
        fixturePath,
        INSTALL_TIMEOUT,
    );
    if (result.exitCode !== 0) {
        throw new Error(`Dependency installation failed for ${fixtureName}:\n${result.stdout}\n${result.stderr}`);
    }
}
