import { rootLogger } from 'ts-jest';

import JestJSDOMEnvironment from './jest-jsdom-env';

jest.mock('jsdom', () => {
    return {};
});
jest.mock('jsdom/package.json', () => {
    return {
        version: '1.0.0',
    };
});
jest.mock('./jest-env-jsdom-abstract', () => {
    return class BaseEnv {};
});

describe('jest-jsdom-env', () => {
    it('should allow using different jsdom version than the version from jest-environment-jsdom', () => {
        rootLogger.debug = jest.fn();
        new JestJSDOMEnvironment(
            {
                projectConfig: Object.create(null),
                globalConfig: Object.create(null),
            },
            Object.create(null),
        );

        expect(rootLogger.debug).toHaveBeenCalledWith('JSDOM version: ', '1.0.0');
    });
});
