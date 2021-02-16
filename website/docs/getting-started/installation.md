---
id: installation
title: Installation
---

### Dependencies

You can install `jest-preset-angular` and dependencies all at once with one of the following commands.

#### NPM

```sh
npm install -D jest jest-preset-angular
```

#### Yarn

```sh
yarn add -D jest jest-preset-angular
```

### Configuration

In your project root, create `setup-jest.ts` file with following contents:

```ts
import 'jest-preset-angular/setup-jest';
```

Add the following section:

- to your root `jest.config.js`

```js
// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
```

- or to your root `package.json`

```json
{
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": ["<rootDir>/setup-jest.ts"]
  }
}
```

### Customizing

#### Global mocks

`jest-preset-angular` uses `JSDOM` which is different from normal browsers. You might need some global browser mocks to
stimulate the behaviors of real browsers in `JSDOM`. To add global mocks, you can do the following:

- Create a file `jest-global-mocks.ts` to your root project.
- Import it in your global setup file:

```ts
// Assuming that your global setup file is setup-jest.ts
import 'jest-preset-angular/setup-jest';
import './jest-global-mocks';
```

:::tip

Feel free to copy the [`jest-global-mocks.ts`](https://github.com/thymikee/jest-preset-angular/blob/master/e2e/test-app-v9/jest-global-mocks.ts) file from the test app directory and save it next to the `setup-jest.ts` file.

:::

#### Avoid karma conflicts

By Angular CLI defaults you'll have a `src/test.ts` file which will be picked up by jest. To circumvent this you can either rename it to `src/karmaTest.ts` or hide it from jest by adding `<rootDir>/src/test.ts` to jest `testPathIgnorePatterns` option.
