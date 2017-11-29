/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { FakeTimers, installCommonGlobals } = require('jest-util');
const mock = require('jest-mock');

class JSDOMEnvironment {
  constructor(config) {
    const { JSDOM } = require('jsdom');

    this.document = new JSDOM('<!doctype html>', {
      url: config.testURL,
      runScripts: 'dangerously'
    });

    const global = this.global = this.document.window.document.defaultView;

    // Node's error-message stack size is limited at 10, but it's pretty useful
    // to see more than that when a test fails.
    global.Error.stackTraceLimit = 100;
    installCommonGlobals(global, config.globals);

    this.moduleMocker = new mock.ModuleMocker(global);
    this.fakeTimers = new FakeTimers(global, this.moduleMocker, config);
  }

  dispose() {
    if (this.fakeTimers) {
      this.fakeTimers.dispose();
    }

    if (this.global) {
      this.global.close();
    }

    this.global = null;
    this.document = null;
    this.fakeTimers = null;
  }

  runScript(script) {
    if (this.global) {
      return this.document.runVMScript(script);
    }

    return null;
  }
}

module.exports = JSDOMEnvironment;

