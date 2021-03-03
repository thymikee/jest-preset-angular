/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

const { rootLogger } = require('ts-jest/dist/utils/logger');

rootLogger.warn("The snapshot serializer under import path `'jest-preset-angular/build/HTMLCommentSerializer.js'` is deprecated and will be removed in v9.0.0. Please switch to `'jest-preset-angular/build/serializers/html-comment'`")

const HTML_ELEMENT_REGEXP = /Comment/;
const test = (value) =>
  value !== undefined &&
  value !== null &&
  value.nodeType === 8 &&
  value.constructor !== undefined &&
  HTML_ELEMENT_REGEXP.test(value.constructor.name);

const print = () => '';

module.exports = {
  print: print,
  test: test,
};
