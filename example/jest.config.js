module.exports = {
  preset: "jest-preset-angular",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png)$": "<rootDir>/__mocks__/image.js",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupJest.ts"
  ]
}
