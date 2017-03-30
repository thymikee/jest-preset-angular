# jest-preset-angular

A preset of [Jest](http://facebook.github.io/jest) configuration for Angular projects.

## Exposed [configuration](https://github.com/thymikee/jest-preset-angular/blob/master/jest-preset.json)
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

### Brief explanation of config
* `<rootDir>` is a special syntax for root of your project (here by default it’s project's root /)
* we’re using some `"globals"` to pass information about where our tsconfig.json file is that we’d like to be able to transform HTML files through ts-jest
* `"transform"` – run every TS, JS, or HTML file through so called *preprocessor* (we’ll get there); this lets Jest understand non-JS syntax
* `"testRegex"` – we want to run Jest on files that matches this regex
* `"moduleFileExtensions"` – our modules are TypeScript and JavaScript files
* `"moduleNameMapper"` – if you’re using absolute imports here’s how to tell Jest where to look for them; uses regex
* `"setupTestFrameworkScriptFile"` – this is the heart of our config, in this file we’ll setup and patch environment within tests are running
* `"transformIgnorePatterns"` – unfortunately some modules (like @ngrx ) are released as TypeScript files, not pure JavaScript; in such cases we cannot ignore them (all node_modules are ignored by default), so they can be transformed through TS compiler like any other module in our project.

## [Preprocessor](https://github.com/thymikee/jest-preset-angular/blob/master/preprocessor.js)
Jest doesn’t run in browser nor through dev server. It uses jsdom to abstract browser environment. So we have to cheat a little and inline our templates and get rid of styles (we’re not testing CSS) because otherwise Angular will try to make XHR call for our templates and fail miserably. 

I used a scrappy regex to accomplish this with minimum effort, but you can also write a babel plugin to make it bulletproof. And btw, don’t bother about perf here – Jest heavily caches transforms. That’s why you need to run Jest with `--no-cache` flag every time you change it.

## Angular testing environment setup

If you look at your `src/test.ts` (or similar bootstrapping test file) file you’ll see similarities to [`setupJest.js`](https://github.com/thymikee/jest-preset-angular/blob/master/setupJest.js). What we’re doing here is we’re adding globals required by Angular. With [jest-zone-patch](https://github.com/thymikee/jest-zone-patch) we also make sure Jest test methods run in Zone context. Then we initialize the Angular testing environment like normal.
