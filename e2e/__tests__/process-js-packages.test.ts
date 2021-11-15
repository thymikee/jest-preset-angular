import fs from 'fs';
import path from 'path';

import { jsonNoCache as runWithJsonNoCache } from '../run-jest';

const TEST_DIR_NAME = 'process-js-packages';
const TEST_DIR_PATH = path.join(__dirname, '..', TEST_DIR_NAME);
const LOG_FILE_NAME = 'ng-jest.log';
const LOG_FILE_PATH = path.join(TEST_DIR_PATH, LOG_FILE_NAME);

test(`successfully runs the tests inside ${TEST_DIR_NAME}`, () => {
  process.env.NG_JEST_LOG = LOG_FILE_NAME;

  const { json } = runWithJsonNoCache(TEST_DIR_NAME);

  expect(json.success).toBe(true);
  expect(fs.existsSync(LOG_FILE_PATH)).toBe(true);

  const logFileContent = fs.readFileSync(LOG_FILE_PATH, 'utf-8');
  const logFileContentAsJson = JSON.parse(logFileContent);

  expect(/node_modules\/(.*.m?js$)/.test(logFileContentAsJson.context.filePath.replace(/\\/g, '/'))).toBe(true);
  expect(logFileContentAsJson.message).toBe('process with esbuild');

  delete process.env.NG_JEST_LOG;
  fs.unlinkSync(LOG_FILE_PATH);
});
