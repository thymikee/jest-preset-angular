const chalk = require('chalk');
const execa = require('execa');

const buildDir = 'build';
const ngTransformerPath = `./src/transformers/downlevel_decorators_transform`;
const bazelFileGlob = 'src/**/BUILD.bazel';
const ngTestFolder = 'src/ngtsc/reflection/test';
const ngTransformerURL =
  'https://github.com/angular/angular/blob/15.0.4/packages/compiler-cli/src/transformers/downlevel_decorators_transform';
const ngReflectionURL = 'https://github.com/angular/angular/blob/15.0.4/packages/compiler-cli/src/ngtsc/reflection';
const tsCompatUrl = 'https://github.com/angular/angular/blob/15.0.4/packages/compiler-cli/src/ngtsc/ts_compatibility';
const transformersFolder = './src/transformers';
const ngtscFolder = './src/ngtsc';

process.stdout.write(chalk.green('  \u2022 ') + 'clean up ' + chalk.blue(buildDir) + '\n');

execa.sync('yarn', ['rimraf', buildDir]);

process.stdout.write(
  chalk.green('  \u2022 ') +
    'clean up previously downloaded assets' +
    chalk.blue(`${ngTransformerPath}, ${ngtscFolder}`) +
    '\n'
);

execa.sync('yarn', ['rimraf', ngTransformerPath, ngtscFolder]);

process.stdout.write(
  chalk.green('  \u2022 ') +
    `downloading Angular Downlevel Decorator Transformer from ${ngTransformerURL}` +
    chalk.green(' \u21D2 ') +
    transformersFolder +
    '\n'
);

execa.sync('yarn', ['fetcher', `--url=${ngTransformerURL}`, `--out=${transformersFolder}`]);

process.stdout.write(
  chalk.green('  \u2022 ') +
    `downloading dependencies for Angular Downlevel Decorator Transformer from ${[ngReflectionURL, tsCompatUrl]}` +
    chalk.green(' \u21D2 ') +
    ngtscFolder +
    '\n'
);

execa.sync('yarn', ['fetcher', `--url=${ngReflectionURL}`, `--out=${ngtscFolder}`]);
execa.sync('yarn', ['fetcher', `--url=${tsCompatUrl}`, `--out=${ngtscFolder}`]);

process.stdout.write(chalk.green('  \u2022 ') + 'clean up Bazel files ' + chalk.blue(bazelFileGlob) + '\n');

execa.sync('yarn', ['rimraf', bazelFileGlob]);

process.stdout.write(chalk.green('  \u2022 ') + 'clean up Angular test files ' + chalk.blue(ngTestFolder) + '\n');

execa.sync('yarn', ['rimraf', ngTestFolder]);
