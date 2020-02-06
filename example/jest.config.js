const { getTestMode } = require('./get-test-mode');

module.exports = {
  preset: `jest-preset-angular/build/${getTestMode()}`,
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png)$": "<rootDir>/__mocks__/image.js",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupJest.ts"
  ]
}
