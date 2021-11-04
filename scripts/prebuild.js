const chalk = require('chalk');
const execa = require('execa');
const path = require('path');

const buildDir = 'build';
const ngTransformerPath = `${process.cwd()}/src/transformers/downlevel_decorators_transform`;
const bazelFileGlob = 'src/**/BUILD.bazel';
const ngTestFolder = 'src/ngtsc/reflection/test';
const ngTransformerURL =
  'https://github.com/angular/angular/tree/master/packages/compiler-cli/src/transformers/downlevel_decorators_transform';
const ngReflectionURL = 'https://github.com/angular/angular/tree/master/packages/compiler-cli/src/ngtsc/reflection';
const transformerFolder = path.join('src', 'transformers');
const reflectionFolder = path.join('src', 'ngtsc', path.sep);

process.stdout.write(chalk.green('  \u2022 ') + 'clean up ' + chalk.blue(buildDir) + '\n');

execa.sync('yarn', ['rimraf', buildDir]);

process.stdout.write(chalk.green('  \u2022 ') + 'clean up ' + chalk.blue(ngTransformerPath) + '\n');

execa.sync('yarn', ['rimraf', `${process.cwd()}/src/transformers/downlevel_decorators_transform`]);

process.stdout.write(
  chalk.green('  \u2022 ') +
    `downloading Angular Downlevel Decorator Transformer from ${ngTransformerURL}` +
    chalk.green(' \u21D2 ') +
    transformerFolder +
    '\n'
);

execa.sync('yarn', ['fetcher', `--url=${ngTransformerURL}`, `--out=${transformerFolder}`]);

process.stdout.write(
  chalk.green('  \u2022 ') +
    `downloading dependencies for Angular Downlevel Decorator Transformer from ${ngReflectionURL}` +
    chalk.green(' \u21D2 ') +
    reflectionFolder +
    '\n'
);

execa.sync('yarn', ['fetcher', `--url=${ngReflectionURL}`, `--out=${reflectionFolder}`]);

process.stdout.write(chalk.green('  \u2022 ') + 'clean up Bazel files ' + chalk.blue(bazelFileGlob) + '\n');

execa.sync('yarn', ['rimraf', bazelFileGlob]);

process.stdout.write(chalk.green('  \u2022 ') + 'clean up Angular test files ' + chalk.blue(ngTestFolder) + '\n');

execa.sync('yarn', ['rimraf', ngTestFolder]);
