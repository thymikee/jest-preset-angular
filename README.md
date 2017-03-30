# jest-preset-angular

Preset Jest configuration for Angular projects

## Exposed configuration
```json
{
  "globals": {
    "__TS_CONFIG__": "src/tsconfig.json",
    "__TRANSFORM_HTML__": true
  },
  "transform": {
    "^.+\\.(ts|js|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
  "moduleFileExtensions": [
    "ts",
    "js",
    "html"
  ],
  "moduleNameMapper": {
    "app/(.*)": "<rootDir>/src/app/$1",
    "environments/(.*)": "<rootDir>/src/environments/$1"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!@ngrx)"
  ]
}
```

## Brief explanation
* `<rootDir>` is a special syntax for root of your project (here by default it’s project's root /)
* we’re using some `"globals"` to pass information about where our tsconfig.json file is that we’d like to be able to transform HTML files through ts-jest
* `"transform"` – run every TS, JS, or HTML file through so called *preprocessor* (we’ll get there); this lets Jest understand non-JS syntax
* `"testRegex"` – we want to run Jest on files that matches this regex
* `"moduleFileExtensions"` – our modules are TypeScript and JavaScript files
* `"moduleNameMapper"` – if you’re using absolute imports here’s how to tell Jest where to look for them; uses regex
* `"setupTestFrameworkScriptFile"` – this is the heart of our config, in this file we’ll setup and patch environment within tests are running
* `"transformIgnorePatterns"` – unfortunately some modules (like @ngrx ) are released as TypeScript files, not pure JavaScript; in such cases we cannot ignore them (all node_modules are ignored by default), so they can be transformed through TS compiler like any other module in our project.
