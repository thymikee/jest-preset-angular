---
id: angular-ivy
title: Angular Ivy
---

Currently, `jest-preset-angular` is partially compatible with Angular Ivy. To make sure that Jest uses the Angular Ivy,
you must run `ngcc` before running tests. `ngcc` will transform all Angular-format packages to be compatible
with Ivy compiler.
