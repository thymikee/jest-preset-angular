---
id: babel-jest
title: Combining with babel-jest
---

If you wish to use `Babel`, you need to say jest to transpile such files manually.

1. Install dependencies required by the official Jest documentation for [Babel integration](https://jest-bot.github.io/jest/docs/babel.html).

2. Install `@babel/preset-env` and add `babel.config.js` (or modify existing if needed) with the following content:

```js
module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env'];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
```

_Note: do not use a `.babelrc` file otherwise the packages that you specify in the next step will not be picked up. CF [Babel documentation](https://babeljs.io/docs/en/configuration#what-s-your-use-case) and the comment `You want to compile node_modules? babel.config.js is for you!`_.

3. Update Jest configuration (by default TypeScript process untranspiled JS files which is source of the problem):

```js
module.exports = {
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
};
```
