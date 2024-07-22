---
id: snapshot-testing
title: Snapshot testing
---

`jest-preset-angular` provides several snapshot serializers to generate clearer and more human-readable snapshot.

:::info

**BY DEFAULT**, the [preset](../getting-started/presets.md) provides all of the snapshot serializers below.

:::

## Snapshot serializers

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc.slice(2)} />

---

## Reference

### Remove html comments (`html-comment`)

Allow removing all the comments in the component HTML in snapshot.

Examples:

#### In Jest config

```js tab title="jest.config.js"
/** @type {import('jest').Config} */
module.exports = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/html-comment'],
  //[...]
};
```

```ts tab title="jest.config.ts"
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/html-comment'],
  //[...]
};

export default jestConfig;
```

#### Or in setup test environment file

```js tab={"span":2} title="jest.config.js"
/** @type {import('jest').Config} */
module.exports = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.js'],
  //[...]
};
```

```js title="setup-jest.js"
const removeHtmlCommentsSerializer = require('jest-preset-angular/build/serializers/html-comment');

expect.addSnapshotSerializer(removeHtmlCommentsSerializer);
```

```ts tab={"span":2} title="jest.config.ts"
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.ts'],
  //[...]
};
```

```ts title="setup-jest.ts"
import removeHtmlCommentsSerializer from 'jest-preset-angular/build/serializers/html-comment';

expect.addSnapshotSerializer(removeHtmlCommentsSerializer);
```

#### Or in individual test files

```js tab title="foo.component.spec.js"
const removeHtmlCommentsSerializer = require('jest-preset-angular/build/serializers/html-comment');

expect.addSnapshotSerializer(removeHtmlCommentsSerializer);

it('should work', () => {
  //[...]
});
```

```ts tab title="foo.component.spec.ts"
import removeHtmlCommentsSerializer from 'jest-preset-angular/build/serializers/html-comment';

expect.addSnapshotSerializer(removeHtmlCommentsSerializer);

it('should work', () => {
  //[...]
});
```

### Display component HTML (`ng-snapshot`)

Allow displaying component HTML with data in snapshot.

#### Configuration options

```ts
type NgSnapshotOptions = {
  omitAllCompAttrs?: boolean;
};
```

Configure snapshot behavior

Examples:

#### In Jest config

```js tab title="jest.config.js"
/** @type {import('jest').Config} */
module.exports = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/ng-snapshot'],
  //[...]
};
```

```ts tab title="jest.config.ts"
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/ng-snapshot'],
  //[...]
};

export default jestConfig;
```

#### Or in setup test environment file

```js tab={"span":2} title="jest.config.js"
/** @type {import('jest').Config} */
module.exports = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.js'],
  //[...]
};
```

```js title="setup-jest.js"
const componentSnapshotSerializer = require('jest-preset-angular/build/serializers/ng-snapshot');

expect.addSnapshotSerializer(componentSnapshotSerializer);
```

```ts tab={"span":2} title="jest.config.ts"
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.ts'],
  //[...]
};
```

```ts title="setup-jest.ts"
import componentSnapshotSerializer from 'jest-preset-angular/build/serializers/ng-snapshot';

expect.addSnapshotSerializer(componentSnapshotSerializer);
```

#### Or in individual test files

```js tab title="foo.component.spec.js"
const componentSnapshotSerializer = require('jest-preset-angular/build/serializers/ng-snapshot');

expect.addSnapshotSerializer(componentSnapshotSerializer);

it('should work', () => {
  //[...]
});
```

```ts tab title="foo.component.spec.ts"
import componentSnapshotSerializer from 'jest-preset-angular/build/serializers/ng-snapshot';

expect.addSnapshotSerializer(componentSnapshotSerializer);

it('should work', () => {
  //[...]
});
```

#### With options

:::info Effective priority

The configured serializers will have affect in this order:

`Jest config` -> `setup files` -> `test files`

The later the higher priority. This means that with the same serializer, the later one will override the configuration
of the previous one in the chain.

:::

- In setup files:

```js tab={"span":2} title="jest.config.js"
/** @type {import('jest').Config} */
module.exports = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.js'],
  //[...]
};
```

```js tab title="setup-jest.js"
const componentSnapshotSerializer = require('jest-preset-angular/build/serializers/ng-snapshot');

expect.addSnapshotSerializer({
  print: (val, print, indent, options, colors) =>
    componentSnapshotSerializer.print(
      val,
      print,
      indent,
      {
        ...options,
        omitAllCompAttrs: true,
      },
      colors,
    ),
  test: componentSnapshotSerializer.test,
});
```

```ts tab={"span":2} title="jest.config.ts"
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.ts'],
  //[...]
};
```

```ts tab title="setup-jest.ts"
import componentSnapshotSerializer from 'jest-preset-angular/build/serializers/ng-snapshot';

expect.addSnapshotSerializer({
  print: (val, print, indent, options, colors) =>
    componentSnapshotSerializer.print(
      val,
      print,
      indent,
      {
        ...options,
        omitAllCompAttrs: true,
      },
      colors,
    ),
  test: componentSnapshotSerializer.test,
});
```

- or in individual test files:

```js tab title="foo.component.spec.js"
const componentSnapshotSerializer = require('jest-preset-angular/build/serializers/ng-snapshot');

expect.addSnapshotSerializer({
  print: (val, print, indent, options, colors) =>
    componentSnapshotSerializer.print(
      val,
      print,
      indent,
      {
        ...options,
        omitAllCompAttrs: true,
      },
      colors,
    ),
  test: componentSnapshotSerializer.test,
});

it('should work', () => {
  //[...]
});
```

```ts tab title="foo.component.spec.ts"
import componentSnapshotSerializer from 'jest-preset-angular/build/serializers/ng-snapshot';

expect.addSnapshotSerializer({
  print: (val, print, indent, options, colors) =>
    componentSnapshotSerializer.print(
      val,
      print,
      indent,
      {
        ...options,
        omitAllCompAttrs: true,
      },
      colors,
    ),
  test: componentSnapshotSerializer.test,
});

it('should work', () => {
  //[...]
});
```

### Remove Angular attributes (`no-ng-attributes`)

Allow removing attributes generated by Angular fixture, like `ng-reflect-*`, `ng-version="*"`, `_ngcontent-c*` etc., from component snapshot

Examples:

#### In Jest config

```js tab title="jest.config.js"
/** @type {import('jest').Config} */
module.exports = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/no-ng-attributes'],
  //[...]
};
```

```ts tab title="jest.config.ts"
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/no-ng-attributes'],
  //[...]
};

export default jestConfig;
```

#### Or in setup test environment file

```js tab={"span":2} title="jest.config.js"
/** @type {import('jest').Config} */
module.exports = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.js'],
  //[...]
};
```

```js title="setup-jest.js"
const removeNgAttributes = require('jest-preset-angular/build/serializers/no-ng-attributes');

expect.addSnapshotSerializer(removeNgAttributes);
```

```ts tab={"span":2} title="jest.config.ts"
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.ts'],
  //[...]
};
```

```ts title="setup-jest.ts"
import removeNgAttributes from 'jest-preset-angular/build/serializers/no-ng-attributes';

expect.addSnapshotSerializer(removeNgAttributes);
```

#### Or in individual test files

```js tab title="foo.component.spec.js"
const removeNgAttributes = require('jest-preset-angular/build/serializers/no-ng-attributes');

expect.addSnapshotSerializer(removeNgAttributes);

it('should work', () => {
  //[...]
});
```

```ts tab title="foo.component.spec.ts"
import removeNgAttributes from 'jest-preset-angular/build/serializers/no-ng-attributes';

expect.addSnapshotSerializer(removeNgAttributes);

it('should work', () => {
  //[...]
});
```
