import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import BaseEnv from '@jest/environment-jsdom-abstract';
import * as JSDOM from 'jsdom';
import { gte } from 'semver';
import { rootLogger } from 'ts-jest';

export default class JestJSDOMEnvironment extends BaseEnv {
    constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
        super(config, context, JestJSDOMEnvironment.getJSDOMModule());

        rootLogger.debug('JSDOM version: ', require('jsdom/package.json').version);
    }

    private static getJSDOMModule(): typeof JSDOM {
        const jsdomVersion = require('jsdom/package.json').version as string;

        if (gte(jsdomVersion, '30.0.0')) {
            return {
                ...JSDOM,
                ResourceLoader: class ResourceLoader {
                    constructor(opts: { userAgent: string }) {
                        void opts;
                    }
                    fetch() {
                        return undefined;
                    }
                },
            } as unknown as typeof JSDOM;
        }

        return JSDOM;
    }
}
