---
id: test-environment
title: Test environment
---

If you look at [`setup-jest.js`](https://github.com/thymikee/jest-preset-angular/blob/main/setup-jest.js),
what we're doing here is we're adding globals required by Angular. With the included [Angular zone patch](https://github.com/angular/angular/tree/main/packages/zone.js)
we also make sure Jest test methods run in Zone context. Then we initialize the Angular testing environment like normal.

While `setup-jest.js` above is for running Jest with **CommonJS** mode, we also provide [`setup-jest.mjs`](https://github.com/thymikee/jest-preset-angular/blob/main/setup-jest.mjs)
to run with **ESM** mode.
