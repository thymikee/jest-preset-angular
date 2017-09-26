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
  return () => syncZone.run(describeBody, null, arguments);
}

// Create a proxy zone in which to run `test` blocks so that the tests function
// can retroactively install different zones.
const testProxyZone = ambientZone.fork(new ProxyZoneSpec());
function wrapTestInZone(testBody) {
  if (testBody === undefined) {
    return;
  }
  return testBody.length === 0
    ? () => testProxyZone.run(testBody, null)
    : done => testProxyZone.run(testBody, null, [done]);
}

['xdescribe', 'fdescribe', 'describe'].forEach(methodName => {
  const originaljestFn = env[methodName];
  env[methodName] = function(description, specDefinitions) {
    return originaljestFn.call(
      this,
      description,
      wrapDescribeInZone(specDefinitions)
    );
  };
  if (methodName === 'describe') {
    env[methodName].only = env['fdescribe'];
    env[methodName].skip = env['xdescribe'];
  }
});

['xit', 'fit', 'test', 'it'].forEach(methodName => {
  const originaljestFn = env[methodName];
  env[methodName] = function(description, specDefinitions, timeout) {
    arguments[1] = wrapTestInZone(specDefinitions);
    return originaljestFn.apply(this, arguments);
  };
  if (methodName === 'test' || methodName === 'it') {
    env[methodName].only = env['fit'];
    env[methodName].skip = env['xit'];
  }
});

['beforeEach', 'afterEach', 'beforeAll', 'afterAll'].forEach(methodName => {
  const originaljestFn = env[methodName];
  env[methodName] = function(specDefinitions, timeout) {
    arguments[0] = wrapTestInZone(specDefinitions);
    return originaljestFn.apply(this, arguments);
  };
});
