#!/usr/bin/env node

const execa = require('execa');

const paths = require('./lib/paths');

execa.sync('rimraf', [paths.distDir]);
