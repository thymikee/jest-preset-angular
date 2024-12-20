import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import * as JSDOM from 'jsdom';
import { rootLogger } from 'ts-jest';

// TODO: Replace with the correct import from `@jest/environment-jsdom-abstract` when Jest 30 is released
import BaseEnv from './jest-env-jsdom-abstract';

export default class JestJSDOMEnvironment extends BaseEnv {
    constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
        super(config, context, JSDOM);
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        rootLogger.debug('JSDOM version: ', require('jsdom/package.json').version);
    }
}
