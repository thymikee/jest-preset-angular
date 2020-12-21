# E2E tests

## Directory structure

- `test-app-v11`: test app using Angular v11 basic setup with `jest` and `jest-preset-angular`.
- `test-app-v10`: test app using Angular v10 with basic setup with `jest` and `jest-preset-angular`.
- `test-app-v9`: test app using Angular v9 with basic setup with `jest` and `jest-preset-angular`.
- `__tests__`: test cases to run against the 3 apps above.

## Running tests

You run the tests on test apps with `yarn test:e2e` (or `npm run test:e2e)`. In `scripts/paths.js`,
`projectsToRun` is resolved by using `glob` to get all Angular projects to run.

What will happen in order is as following:

1. Set process env variable `process.env.NG_9` if current project is Angular 9 project.
2. Each test project will install its dependencies.
3. Each test project will clean up all old assets.
4. Each test project will copy `build`, `jest-preset.js`, `package.json`, `ngcc-jest-processor.js` to its `node_modules/jest-preset-angular`
5. Each test project will copy `__tests__` to its `src` folder. 
6. Each test suite in each test project runs according to `jest` config of that project.
7. After tests finish, remove `__tests__` folder in each project `src` and delete `process.env.NG_9`.
