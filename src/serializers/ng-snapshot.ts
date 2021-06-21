import type { Type, ComponentRef, ɵCssSelectorList, DebugNode } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import type { Colors } from 'pretty-format';

/**
 * The follow interfaces are customized heavily inspired by @angular/core/core.d.ts
 */
interface ComponentDef {
  selectors: ɵCssSelectorList;
}
interface VEComponentType extends Type<unknown> {
  ngComponentDef: ComponentDef;
}
interface IvyComponentType extends Type<unknown> {
  ɵcmp: ComponentDef;
}
interface NgComponentRef extends ComponentRef<unknown> {
  _elDef: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  _view: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
interface NgComponentFixture extends ComponentFixture<unknown> {
  componentRef: NgComponentRef;
  componentInstance: Record<string, unknown>;
}
interface VEDebugNode {
  renderElement: {
    childNodes: DebugNode[];
  };
}

/**
 * The following types haven't been exported by jest so temporarily we copy typings from 'pretty-format'
 */
interface PluginOptions {
  edgeSpacing: string;
  min: boolean;
  spacing: string;
}
type Indent = (indentSpaces: string) => string;
type Printer = (elementToSerialize: unknown) => string;

const printAttributes = (
  val: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  attributes: string[],
  _print: Printer,
  indent: Indent,
  colors: Colors,
  opts: PluginOptions,
): string => {
  return attributes
    .sort()
    .map((attribute) => {
      return (
        opts.spacing +
        indent(`${colors.prop.open}${attribute}${colors.prop.close}=`) +
        colors.value.open +
        (val.componentInstance[attribute] && val.componentInstance[attribute].constructor
          ? `{[Function ${val.componentInstance[attribute].constructor.name}]}`
          : `"${val.componentInstance[attribute]}"`) +
        colors.value.close
      );
    })
    .join('');
};

const ivyEnabled = (): boolean => {
  // Should be required lazily, since it will throw an exception
  // `Cannot resolve parameters...`.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const { ɵivyEnabled } = require('@angular/core');

  return !!ɵivyEnabled;
};

// Ivy component definition was stored on the `ngComponentDef`
// property before `9.0.0-next.10`. Since `9.0.0-next.10` it was
// renamed to `ɵcmp`.
const getComponentDef = (type: VEComponentType | IvyComponentType): ComponentDef =>
  (type as VEComponentType).ngComponentDef ?? (type as IvyComponentType).ɵcmp;

const print = (
  fixture: NgComponentFixture,
  print: Printer,
  indent: Indent,
  opts: PluginOptions,
  colors: Colors,
): string => {
  let nodes = '';
  let componentAttrs = '';
  let componentName = '';

  if (ivyEnabled()) {
    const componentDef = getComponentDef(fixture.componentRef.componentType as IvyComponentType);
    componentName = componentDef.selectors[0][0] as string;
    nodes = Array.from(fixture.componentRef.location.nativeElement.childNodes).map(print).join('');
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    componentName = fixture.componentRef._elDef.element?.name;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    nodes = (fixture.componentRef._view.nodes ?? [])
      // eslint-disable-next-line no-prototype-builtins
      .filter((node: VEDebugNode) => node?.hasOwnProperty('renderElement'))
      .map((node: VEDebugNode) => Array.from(node.renderElement.childNodes).map(print).join(''))
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
  ).replace(/\n^\s*\n/gm, '\n');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const test = (val: any): boolean =>
  val !== undefined &&
  val !== null &&
  typeof val === 'object' &&
  Object.prototype.hasOwnProperty.call(val, 'componentRef');

export = {
  print,
  test,
};
