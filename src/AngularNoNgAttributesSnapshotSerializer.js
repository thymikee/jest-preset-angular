'use strict';

const jestDOMElementSerializer = require('pretty-format').plugins.DOMElement;

const attributesToRemovePatterns = ['ng-reflect', '_nghost', '_ngcontent', 'ng-version'];
const attributesToClean = {
  class: [/^.*-\w*\d+-\d+$/, /^ng-star-inserted$/], // e.g. "ng-tns-c25-1 or ng-star-inserted, literally"
  id: [/^.*-\d+$/], // e.g. "mat-input-4", "cdk-step-content-0-0"
  for: [/^.*-\d+$/], // e.g. "mat-form-field-label-9"
  'aria-owns': [/^.*-\d+$/], // e.g. "mat-input-4"
  'aria-labelledby': [/^.*-\d+$/], // e.g. "mat-input-4", "cdk-step-label-0-0"
  'aria-controls': [/^.*-\d+$/], // e.g. "cdk-step-content-2-0"
};

const hasAttributesToRemove = (attribute) =>
  attributesToRemovePatterns
    .some(removePattern => attribute.name.startsWith(removePattern));
const hasAttributesToClean = (attribute) => {
  return Object.keys(attributesToClean).some(
    removePatternKey => attribute.name === removePatternKey,
  );
};

const serialize = (node, ...rest) => {
  const nodeCopy = node.cloneNode(true);
  // Remove angular-specific attributes
  Object.values(nodeCopy.attributes)
    .filter(hasAttributesToRemove)
    .forEach(attribute => nodeCopy.attributes.removeNamedItem(attribute.name));
  // Remove angular auto-added classes
  Object.values(nodeCopy.attributes)
    .filter(hasAttributesToClean)
    .forEach(attribute => {
      attribute.value = attribute.value
        .split(' ')
        .filter(attrValue => {
          return !attributesToClean[attribute.name].some(attributeCleanRegex => 
              attributeCleanRegex.test(attrValue),
          );
        })
        .join(' ');
      nodeCopy.attributes.setNamedItem(attribute);
    });

  return jestDOMElementSerializer.serialize(nodeCopy, ...rest);
};

const serializeTestFn = (val) => {
  return val.attributes !== undefined && Object.values(val.attributes)
    .some(attribute => hasAttributesToRemove(attribute) || hasAttributesToClean(attribute))
};
const test = val =>
  jestDOMElementSerializer.test(val) && serializeTestFn(val);

module.exports = {
  serialize: serialize,
  test: test
};
