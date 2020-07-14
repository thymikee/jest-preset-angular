# Scripts


## Directory structure

- `lib`: helpers to run e2e tests
    + `bundle.js`: run `npm pack` to build `jest-preset-angular` source and pack into a `.tgz` file.
    + `logger.js`: alias for `console`.
    + `paths.d.ts`: type declaration for `paths.js`.
    + `paths.js`: projects' paths declaration, contains all paths of the existing projects in `e2e`.
    
- `clean-build.js`: remove `build` folder, run in `npm prebuild`.
- `e2e.js`: script to run tests in each project in `e2e` directory.

    
