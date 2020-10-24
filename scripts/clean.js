#!/usr/bin/env node

const execa = require('execa');

const paths = require('./paths');

execa.sync('rimraf', [paths.distDir]);
