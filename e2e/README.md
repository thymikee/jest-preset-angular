# E2E tests


## Directory structure

- `test-app-v10`: test app using Angular v10 with basic setup with `jest` and `jest-preset-angular`.
- `test-app-v9`: test app using Angular v9 with basic setup with `jest` and `jest-preset-angular`.


## Running tests

You run the tests on test apps with `yarn test:e2e` (or `npm run test:e2e)`. In `scripts/lib/paths.js`,
`projectsToRun` must be modified if a new project is added to `e2e`.

What will happen in order is as following:

1. Each test project will install its dependencies
2. Each test suite in each test project runs according to `jest` config of that project.


## Why

E2E tests being in a temporary folder of the operating system ensure none of the parents would be containing `node_modules`.

Having the test cases outside of `[jest-preset-angular]` project's root ensures it won't fallback the resolution of node modules within dev dependencies of `jest-preset-angular` itself.
