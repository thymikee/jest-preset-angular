/**
 * Patch Jest's describe/test/beforeEach/afterEach functions so test code
 * always runs in a testZone (ProxyZone).
 */

if (Zone === undefined) {
  throw new Error('Missing: Zone (zone.js)');
}
if (jest === undefined) {
  throw new Error(
    'Missing: jest.\n' +
      'This patch must be included in a script called with ' +
      '`setupTestFrameworkScriptFile` in Jest config.'
  );
}
if (jest['__zone_patch__'] === true) {
  throw new Error("'jest' has already been patched with 'Zone'.");
}

jest['__zone_patch__'] = true;
const SyncTestZoneSpec = Zone['SyncTestZoneSpec'];
const ProxyZoneSpec = Zone['ProxyZoneSpec'];

if (SyncTestZoneSpec === undefined) {
  throw new Error('Missing: SyncTestZoneSpec (zone.js/dist/sync-test)');
}
if (ProxyZoneSpec === undefined) {
  throw new Error('Missing: ProxyZoneSpec (zone.js/dist/proxy.js)');
}

const env = global;
const ambientZone = Zone.current;

// Create a synchronous-only zone in which to run `describe` blocks in order to
// raise an error if any asynchronous operations are attempted
// inside of a `describe` but outside of a `beforeEach` or `it`.
const syncZone = ambientZone.fork(new SyncTestZoneSpec('jest.describe'));
function wrapDescribeInZone(describeBody) {
  return function(...args) {
    return syncZone.run(describeBody, null, args);
  };
}

// Create a proxy zone in which to run `test` blocks so that the tests function
// can retroactively install different zones.
const testProxyZone = ambientZone.fork(new ProxyZoneSpec());
function wrapTestInZone(testBody, eachArgs) {
  if (testBody === undefined) {
    return;
  }

  if (!eachArgs || eachArgs.length === 0 || eachArgs[0].length === 0) {
    // If we are not handling `test.each`, then the parameter of `testBody`
    // will be 0 or 1, if it is 1, then we need to return a function with
    // done parameter
    return testBody.length === 0
      ? () => testProxyZone.run(testBody, null)
      : done => testProxyZone.run(testBody, null, [done]);
  } else {
    // Dynamically create a Function to contain the same length
    // of the parameters as the testBody
    // For example:
    // ```
    // test.each([[1, 2]])('test.each', (arg1, arg2) => {});
    // ```
    // In this case we need to return a function like this
    // ```
    // return function(arg1, arg2) {
    //   return testProxyZone.run(testBody, null, [arg1, arg2]);
    // }
    // ```
    const len = eachArgs[0].length;
    const args = [];
    let argString = '';
    for (let i = 0; i < len; i++) {
      args.push('arg' + i);
      argString += 'arg' + i;
      if (i !== len - 1) {
        argString += ', ';
      }
    }
    args.push('testBody');
    args.push('testProxyZone');
    if (len < testBody.length) {
      args.push('done');
      argString += ', done';
    }
    const funcBody = `
      return testProxyZone.run(testBody, null, [${argString}])`;
    return new Function(args, funcBody);
  }
}

/**
 * bind describe method to wrap describe.each function
 */
const bindDescribe = originalJestFn =>
  function(...eachArgs) {
    return function(...args) {
      args[1] = wrapDescribeInZone(args[1]);
      return originalJestFn.apply(this, eachArgs).apply(this, args);
    };
  };

/**
 * bind test method to wrap test.each function
 */
const bindTest = originalJestFn =>
  function(...eachArgs) {
    return function(...args) {
      const testBody = args[1];
      if (
        testBody.length > 0 &&
        Array.isArray(eachArgs) &&
        eachArgs.length > 0 &&
        eachArgs[0].length > 0
      ) {
        // check whether eachArgs is a 1D array
        if (!Array.isArray(eachArgs[0][0])) {
          // transfer eachArgs from 1D to 2D array
          eachArgs = eachArgs.map(row => row.map(a => [a]));
        }
      }
      args[1] = wrapTestInZone(args[1], ...eachArgs);
      if (testBody.length > 0 || (eachArgs.length > 0 && eachArgs[0].length > 0)) {
        eachArgs.forEach(row => {
          const modifiedRow = row.map(a => {
            a.push(testBody);
            a.push(testProxyZone);
          });
          return modifiedRow;
        });
      }
      return originalJestFn.apply(this, eachArgs).apply(this, args);
    };
  };

['xdescribe', 'fdescribe', 'describe'].forEach(methodName => {
  const originaljestFn = env[methodName];
  env[methodName] = function(...args) {
    args[1] = wrapDescribeInZone(args[1]);
    return originaljestFn.apply(this, args);
  };
  env[methodName].each = bindDescribe(originaljestFn.each);
  if (methodName === 'describe') {
    env[methodName].only = env['fdescribe'];
    env[methodName].skip = env['xdescribe'];
  }
});

['xit', 'fit', 'xtest', 'test', 'it'].forEach(methodName => {
  const originaljestFn = env[methodName];
  env[methodName] = function(...args) {
    args[1] = wrapTestInZone(args[1]);
    return originaljestFn.apply(this, args);
  };
  env[methodName].each = bindTest(originaljestFn.each);

  if (methodName === 'test' || methodName === 'it') {
    env[methodName].only = env['fit'];
    env[methodName].skip = env['xit'];

    env[methodName].todo = function(...args) {
      return originaljestFn.todo.apply(this, args);
    };
  }
});

['beforeEach', 'afterEach', 'beforeAll', 'afterAll'].forEach(methodName => {
  const originaljestFn = env[methodName];
  env[methodName] = function(...args) {
    args[0] = wrapTestInZone(args[0]);
    return originaljestFn.apply(this, args);
  };
});
