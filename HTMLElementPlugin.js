/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

function escapeHTML(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const HTML_ELEMENT_REGEXP = /(HTML\w*?Element)|Text$|Comment/;
const test = isHTMLElement;

function isHTMLElement(value) {
  return (
    value !== undefined &&
    value !== null &&
    (value.nodeType === 1 || value.nodeType === 3 || value.nodeType === 8) &&
    value.constructor !== undefined &&
    HTML_ELEMENT_REGEXP.test(value.constructor.name)
  );
}

function printChildren(flatChildren, print, indent, colors, opts) {
  return flatChildren
    .map(node => {
      if (typeof node === 'object') {
        return print(node, print, indent, colors, opts);
      } else if (typeof node === 'string') {
        return colors.content.open + escapeHTML(node) + colors.content.close;
      } else {
        return print(node);
      }
    })
    .filter(value => !!value)
    .join(opts.edgeSpacing);
}

function printAttributes(attributes, indent, colors, opts) {
  return attributes
    .sort()
    .filter(attribute => attribute.name !== 'ng-version')
    .map(attribute => {
      return (
        opts.spacing +
        indent(colors.prop.open + attribute.name + colors.prop.close + '=') +
        colors.value.open +
        `"${attribute.value}"` +
        colors.value.close
      );
    })
    .join('');
}

const print = (element, print, indent, opts, colors) => {
  if (element instanceof Text) {
    return element.data.trim();
  }

  if (element instanceof Comment) {
    return '';
  }

  let result = colors.tag.open + '<';
  const elementName = element.tagName.toLowerCase();
  result += elementName + colors.tag.close;

  const hasAttributes = element.attributes && element.attributes.length;
  if (hasAttributes) {
    const attributes = Array.from(element.attributes);
    result += printAttributes(attributes, indent, colors, opts);
  }

  // TODO: Switch to element.childNodes for Jest 20
  const flatChildren = Array.from(element.children);
  if (!flatChildren.length && element.textContent) {
    flatChildren.push(element.textContent.trim());
  }

  const closeInNewLine = hasAttributes && !opts.min;
  if (flatChildren.length) {
    const children = printChildren(flatChildren, print, indent, colors, opts);
    result +=
      colors.tag.open +
      (closeInNewLine ? '\n' : '') +
      '>' +
      colors.tag.close +
      (children && opts.edgeSpacing + indent(children) + opts.edgeSpacing) +
      colors.tag.open +
      '</' +
      elementName +
      '>' +
      colors.tag.close;
  } else {
    result +=
      colors.tag.open + (closeInNewLine ? '\n' : ' ') + '/>' + colors.tag.close;
  }

  return result;
};

module.exports = {print, test};
