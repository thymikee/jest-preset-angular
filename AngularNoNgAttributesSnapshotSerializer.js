'use strict';

const jestDOMElementSerializer = require('pretty-format').plugins.DOMElement;

const attributesToRemovePatterns = ['ng-reflect', '_nghost', '_ngcontent', 'ng-version'];

const serialize = (node, ...rest) => {
  const nodeCopy = node.cloneNode(true);
  Object.values(nodeCopy.attributes)
    .map(attribute => attribute.name)
    .filter(attributeName =>
      attributesToRemovePatterns
        .some(removeAttributePattern => attributeName.startsWith(removeAttributePattern))
    )
    .forEach(attributeNameToRemove => nodeCopy.attributes.removeNamedItem(attributeNameToRemove));

  return jestDOMElementSerializer.serialize(nodeCopy, ...rest);
};

const serializeTestFn = (val) => {
  return val.attributes !== undefined && Object.values(val.attributes)
    .map(attribute => attribute.name)
    .some(attributeName =>
      attributesToRemovePatterns
        .some(remotePattern => attributeName.startsWith(remotePattern))
    )
};
const test = val =>
  jestDOMElementSerializer.test(val) && serializeTestFn(val);

module.exports = {
  serialize: serialize,
  test: test
};
