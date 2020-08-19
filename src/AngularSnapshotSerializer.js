'use strict';

const printAttributes = (val, attributes, print, indent, colors, opts) => {
  return attributes
    .sort()
    .map((attribute) => {
      return (
        opts.spacing +
        indent(colors.prop.open + attribute + colors.prop.close + '=') +
        colors.value.open +
        (val.componentInstance[attribute] && val.componentInstance[attribute].constructor
          ? '{[Function ' + val.componentInstance[attribute].constructor.name + ']}'
          : `"${val.componentInstance[attribute]}"`) +
        colors.value.close
      );
    })
    .join('');
};

const ivyEnabled = () => {
  // Should be required lazily, since it will throw an exception
  // `Cannot resolve parameters...`.
  const { ɵivyEnabled } = require('@angular/core');

  return !!ɵivyEnabled;
};

// Ivy component definition was stored on the `ngComponentDef`
// property before `9.0.0-next.10`. Since `9.0.0-next.10` it was
// renamed to `ɵcmp`.
const getComponentDef = (type) => type.ngComponentDef || type.ɵcmp;

const print = (fixture, print, indent, opts, colors) => {
  let nodes = '';
  let componentAttrs = '';
  let componentName = '';

  if (ivyEnabled()) {
    const componentDef = getComponentDef(fixture.componentRef.componentType);
    componentName = componentDef.selectors[0][0];
    nodes = Array.from(fixture.componentRef.location.nativeElement.childNodes).map(print).join('');
  } else {
    componentName = fixture.componentRef._elDef.element.name;
    nodes = (fixture.componentRef._view.nodes || [])
      // eslint-disable-next-line no-prototype-builtins
      .filter((node) => node && node.hasOwnProperty('renderElement'))
      .map((node) => Array.from(node.renderElement.childNodes).map(print).join(''))
      .join(opts.edgeSpacing);
  }

  const attributes = Object.keys(fixture.componentInstance);

  if (attributes.length) {
    componentAttrs += printAttributes(fixture, attributes, print, indent, colors, opts);
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

const test = (val) =>
  val !== undefined &&
  val !== null &&
  typeof val === 'object' &&
  Object.prototype.hasOwnProperty.call(val, 'componentRef');

module.exports = {
  print: print,
  test: test,
};
