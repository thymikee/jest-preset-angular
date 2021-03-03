/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const HTML_ELEMENT_REGEXP = /Comment/;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const test = (value: any): boolean =>
  value?.nodeType === 8 && value.constructor !== undefined && HTML_ELEMENT_REGEXP.test(value.constructor.name);

const print = (): string => '';

export = {
  print,
  test,
};
