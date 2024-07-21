import type { ɵComponentType, ɵDirectiveDef } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import type { OldPlugin } from 'pretty-format';

const attributesToRemovePatterns = ['__ngContext__'];

const print: OldPlugin['print'] = (fixture, printer, indent, opts, colors) => {
    let componentAttrs = '';
    const { componentRef, componentInstance } = fixture as ComponentFixture<Record<string, unknown>>;
    const componentDef = (componentRef.componentType as ɵComponentType<unknown>).ɵcmp as ɵDirectiveDef<unknown>;
    const componentName = componentDef.selectors[0][0] as string;
    const nodes = Array.from(componentRef.location.nativeElement.childNodes).map(printer).join('');
    const attributes = Object.keys(componentInstance).filter((key) => !attributesToRemovePatterns.includes(key));
    if (attributes.length) {
        componentAttrs += attributes
            .sort()
            .map((attribute) => {
                const compAttrVal = componentInstance[attribute];

                return (
                    opts.spacing +
                    indent(`${colors.prop.open}${attribute}${colors.prop.close}=`) +
                    colors.value.open +
                    (compAttrVal && compAttrVal.constructor
                        ? `{[Function ${compAttrVal.constructor.name}]}`
                        : `"${compAttrVal}"`) +
                    colors.value.close
                );
            })
            .join('');
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

const test: OldPlugin['test'] = (val) => !!val && typeof val === 'object' && 'componentRef' in val;

export = {
    print,
    test,
} as OldPlugin;
