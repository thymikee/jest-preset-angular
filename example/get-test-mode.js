const defaultTestMode = 'ts-jest';
const envTestModeKey = 'JPA_TEST_MODE';

module.exports = {
  getTestMode() {
    if (process.env && envTestModeKey in process.env && typeof process.env[envTestModeKey] === 'string') {
      return process.env[envTestModeKey];
    }
    return defaultTestMode;
  }
}
