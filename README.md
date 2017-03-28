# jest-zone-patch
Enables Jest functions to be run within Zone.js context, specifically for [Angular](https://angular.io) apps.

## Usage

Place it in your `setupJestTestFramework.ts` (or so) file
```js
import 'jest-zone-patch';
```

And run it as Jest's `setupTestFrameworkScriptFile`:

```json
"jest": {
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupJestTestFramework.ts"
}
```

It's crucial to run this patch here, because at this point patched functions like `test` or `describe` are available in global scope.
