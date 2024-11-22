<h1 align="center">Jest Preset Angular</h1>

<p align="center">A preset of Jest configuration for Angular projects.</p>

<p align="center">
    <a href="https://actions-badge.atrox.dev/thymikee/jest-preset-angular/goto?ref=main"><img alt="Build Status" src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fthymikee%2Fjest-preset-angular%2Fbadge%3Fref%3Dmain&style=flat-square" /></a>
    <a href="https://www.npmjs.com/package/jest-preset-angular"><img src="https://img.shields.io/npm/v/jest-preset-angular/latest.svg?style=flat-square" alt="NPM Version" /></a>
    <a href="https://github.com/thymikee/jest-preset-angular/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/jest-preset-angular.svg?style=flat-square" alt="GitHub license" /></a>
</p>

> Our online documentation is available at https://thymikee.github.io/jest-preset-angular/

> This is a part of the article: [Testing Angular faster with Jest](https://www.xfive.co/blog/testing-angular-faster-jest/).

## Installation

Install using [`yarn`](https://yarnpkg.com/en/package/jest-preset-angular):

```bash
yarn add -D jest jest-preset-angular @types/jest
```

Or [`npm`](https://www.npmjs.com/package/jest-preset-angular):

```bash
npm install -D jest jest-preset-angular @types/jest
```

## Configuration

Check out our [Configuration guidance](https://thymikee.github.io/jest-preset-angular/docs/getting-started/installation).

**IMPORTANT**

Angular doesn't support native `async/await` in testing with `target` higher than `ES2016`, see https://github.com/angular/components/issues/21632#issuecomment-764975917

## Migration from Angular < 13

Check out our [Migration from Angular < 13 guidance](https://thymikee.github.io/jest-preset-angular/docs/guides/angular-13+)

## Angular Ivy

Check out our [Angular Ivy guidance](https://thymikee.github.io/jest-preset-angular/docs/guides/angular-ivy)

## Example projects with base Jest configuration

We have [example apps](https://github.com/thymikee/jest-preset-angular/tree/main/examples) to provide a basic setup to use Jest in an Angular project.
The `examples` folder consist of several example Angular applications from **v13** onwards as well as example projects
with `yarn workspace` or monorepo structure.

## Built With

- [TypeScript](https://www.typescriptlang.org/) - JavaScript that scales
- [Angular](https://angular.dev/) - Deliver web apps with confidence 🚀
- [`ts-jest`](https://kulshekhar.github.io/ts-jest) - Jest transformer for TypeScript

## Authors/maintainers

- **Michał Pierzchała** - [thymikee](https://github.com/thymikee)
- **Ahn** - [ahnpnl](https://github.com/ahnpnl)
- **Thomas** - [wtho](https://github.com/wtho)

See also the list of [contributors](https://github.com/thymikee/jest-preset-angular/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
