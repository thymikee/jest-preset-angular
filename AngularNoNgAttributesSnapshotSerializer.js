'use strict';

const jestDOMElementSerializer = require('pretty-format').plugins.DOMElement;

const attributesToRemovePatterns = ['ng-reflect', '_nghost', '_ngcontent', 'ng-version'];

const hasAttributesToRemove = (attribute) =>
  attributesToRemovePatterns
    .some(removePattern => attribute.name.startsWith(removePattern));

const serialize = (node, ...rest) => {
  const nodeCopy = node.cloneNode(true);
  Object.values(nodeCopy.attributes)
    .filter(hasAttributesToRemove)
    .forEach(attribute => nodeCopy.attributes.removeNamedItem(attribute.name));

  return jestDOMElementSerializer.serialize(nodeCopy, ...rest);
};

const serializeTestFn = (val) => {
  return val.attributes !== undefined && Object.values(val.attributes)
    .some(hasAttributesToRemove)
};
const test = val =>
  jestDOMElementSerializer.test(val) && serializeTestFn(val);

module.exports = {
  serialize: serialize,
  test: test
};
