'use strict';

const printAttributes = (val, attributes, print, indent, colors, opts) => {
  return attributes
    .sort()
    .map(attribute => {
      return (
        opts.spacing +
        indent(colors.prop.open + attribute + colors.prop.close + '=') +
        colors.value.open +
        (val.componentInstance[attribute] &&
          val.componentInstance[attribute].constructor
          ? '{[Function ' +
              val.componentInstance[attribute].constructor.name +
              ']}'
          : `"${val.componentInstance[attribute]}"`) +
        colors.value.close
      );
    })
    .join('');
};

const print = (val, print, indent, opts, colors) => {
  let componentAttrs = '';

  const componentName = val.componentRef._elDef.element.name;
  const nodes = (val.componentRef._view.nodes || [])
    .filter(node => node && node.hasOwnProperty('renderElement'))
    .map(node => Array.from(node.renderElement.childNodes).map(print).join(''))
    .join(opts.edgeSpacing);

  const attributes = Object.keys(val.componentInstance);

  if (attributes.length) {
    componentAttrs += printAttributes(
      val,
      attributes,
      print,
      indent,
      colors,
      opts
    );
  }

  return (
    '<' +
    componentName +
    componentAttrs +
    (componentAttrs.length ? '\n' : '') +
    '>\n' +
    indent(nodes) +
    '\n</' +
    componentName +
    '>'
  );
};

const test = val =>
  val !== undefined &&
  val !== null &&
  typeof val === 'object' &&
  Object.prototype.hasOwnProperty.call(val, 'componentRef');

module.exports = {
  print: print,
  test: test
};
