# E2E tests


## Directory structure

- `test-app-v10`: example app using Angular v10 with basic setup with `jest` and `jest-preset-angular`.
- `test-app-v9`: example app using Angular v9 with basic setup with `jest` and `jest-preset-angular`.


## Running tests

You run the tests on example apps with `yarn test:e2e` (or `npm run test:e2e)`. In `scripts/lib/paths.js`,
`projectsToRun` must be modified if a new project is added to `e2e`.

What will happen in order is as following:

1. A bundle (we'll call it `[bundle]`) will be created for `jest-preset-angular` using `npm pack` (`yarn pack` is buggy).

    The `prepare` script will be run, so `clean` and `build` (that is why e2e tests are launched before the others, since it's building as part of the process)
 
2. `npm ci` and `npm install --save-dev [bundle]` will be run in each project directory in `e2e` directory.
3. each test suite in each example project are run according to `jest` config of that project.


## Why

E2E tests being in a temporary folder of the operating system ensure none of the parents would be containing `node_modules`.

Having the test cases outside of `[jest-preset-angular]` project's root ensures it won't fallback the resolution of node modules within dev dependencies of `jest-preset-angular` itself.

Not to mention that using `npm pack` ensure those tests cases have the same version of `jest-preset-angular` as the one we would publish on NPM.
