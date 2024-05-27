import type { ComponentRef, Type, ɵCssSelectorList } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import type { Colors } from 'pretty-format';

/**
 * The follow interfaces are customized heavily inspired by @angular/core/core.d.ts
 */
interface ComponentDef {
    selectors: ɵCssSelectorList;
}
interface IvyComponentType extends Type<unknown> {
    ɵcmp: ComponentDef;
}
interface NgComponentRef extends ComponentRef<unknown> {
    componentType: IvyComponentType;
    _elDef: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    _view: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
interface NgComponentFixture extends ComponentFixture<unknown> {
    componentRef: NgComponentRef;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentInstance: Record<string, any>;
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

const attributesToRemovePatterns = ['__ngContext__'];

const print = (
    fixture: NgComponentFixture,
    printer: Printer,
    indent: Indent,
    opts: PluginOptions,
    colors: Colors,
): string => {
    let componentAttrs = '';
    const { componentRef, componentInstance } = fixture;
    const componentDef = componentRef.componentType.ɵcmp;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const test = (val: any): boolean =>
    !!val && typeof val === 'object' && Object.prototype.hasOwnProperty.call(val, 'componentRef');

export = {
    print,
    test,
};
