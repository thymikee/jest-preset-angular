import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import BaseEnv from '@jest/environment-jsdom-abstract';
import * as JSDOM from 'jsdom';
import { rootLogger } from 'ts-jest';

export default class JestJSDOMEnvironment extends BaseEnv {
    constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
        super(config, context, JSDOM);

        rootLogger.debug('JSDOM version: ', require('jsdom/package.json').version);
    }
}
