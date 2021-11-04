---
id: test-environment
title: Test environment
---

If you look at [`setup-jest.ts`](https://github.com/thymikee/jest-preset-angular/blob/main/src/config/setup-jest.ts),
what we're doing here is we're adding globals required by Angular. With the included [jest-zone-patch](https://github.com/thymikee/jest-preset-angular/tree/main/src/zone-patch)
we also make sure Jest test methods run in Zone context. Then we initialize the Angular testing environment like normal.
