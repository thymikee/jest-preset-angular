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

<TOCInline toc={toc.slice(1)} />

---

### Remove html comments (`html-comment`)

Allow removing all the comments in the component HTML in snapshot.

#### Examples:

- In Jest config file

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/html-comment'],
  //[...]
};

export default jestConfig;
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/html-comment'],
  //[...]
};

export default jestConfig;
```

- Or in setup test environment file

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.ts'],
  //[...]
};
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
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

- Or in individual test files

```ts title="foo.component.spec.ts"
import removeHtmlCommentsSerializer from 'jest-preset-angular/build/serializers/html-comment';

expect.addSnapshotSerializer(removeHtmlCommentsSerializer);

it('should work', () => {
  //[...]
});
```

### Display component HTML (`ng-snapshot`)

Allow displaying component HTML with data in snapshot.

#### Parameters

- options(**optional**):
  - omitAllCompAttrs: remove all component DOM attributes

```ts
type NgSnapshotOptions = {
  omitAllCompAttrs?: boolean;
};
```

#### Examples:

- In Jest config

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/ng-snapshot'],
  //[...]
};

export default jestConfig;
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/ng-snapshot'],
  //[...]
};

export default jestConfig;
```

- Or in setup test environment file

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.ts'],
  //[...]
};
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
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

- Or in individual test files

```ts title="foo.component.spec.ts"
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

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.ts'],
  //[...]
};

export default jestConfig;
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.ts'],
  //[...]
};

export default jestConfig;
```

```ts title="setup-jest.ts"
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

```ts title="foo.component.spec.ts"
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

#### Examples:

- In Jest config

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/no-ng-attributes'],
  //[...]
};

export default jestConfig;
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  snapshotSerializers: ['jest-preset-angular/build/serializers/no-ng-attributes'],
  //[...]
};

export default jestConfig;
```

- Or in setup test environment file

```ts title="jest.config.ts" tab={"label": "TypeScript CJS"}
import type { Config } from 'jest';

const jestConfig: Config = {
  //[...]
  setupFilesAfterEnv: ['./setup-jest.ts'],
  //[...]
};
```

```ts title="jest.config.mts" tab={"label": "TypeScript ESM"}
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

- Or in individual test files

```ts title="foo.component.spec.ts"
import removeNgAttributes from 'jest-preset-angular/build/serializers/no-ng-attributes';

expect.addSnapshotSerializer(removeNgAttributes);

it('should work', () => {
  //[...]
});
```
