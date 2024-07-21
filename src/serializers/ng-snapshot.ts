import type { ɵComponentType, ɵDirectiveDef } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import type { OldPlugin } from 'pretty-format';

const attributesToRemovePatterns = ['__ngContext__'];

type PluginPrintFnArgs = Parameters<OldPlugin['print']>;

type NgSnapshotOptions = {
    omitAllCompAttrs?: boolean;
};

type PluginPrintFn = (
    fixture: PluginPrintFnArgs[0],
    printer: PluginPrintFnArgs[1],
    indent: PluginPrintFnArgs[2],
    opts: PluginPrintFnArgs[3] & NgSnapshotOptions,
    colors: PluginPrintFnArgs[4],
) => string;

const removeTrailingWhiteSpaces = (serializedComponent: string): string => {
    return serializedComponent.replace(/\n^\s*\n/gm, '\n');
};

const print: PluginPrintFn = (fixture, printer, indent, opts, colors) => {
    const { componentRef, componentInstance } = fixture as ComponentFixture<Record<string, unknown>>;
    const componentDef = (componentRef.componentType as ɵComponentType<unknown>).ɵcmp as ɵDirectiveDef<unknown>;
    const componentName = componentDef.selectors[0][0] as string;
    const nodes = Array.from(componentRef.location.nativeElement.childNodes).map(printer).join('');
    let serializedComponent = '';
    if (opts.omitAllCompAttrs) {
        serializedComponent = '<' + componentName + '>\n' + indent(nodes) + '\n</' + componentName + '>';
    } else {
        const attributes = Object.keys(componentInstance).filter((key) => !attributesToRemovePatterns.includes(key));
        const componentAttrs = attributes
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
        serializedComponent =
            '<' +
            componentName +
            componentAttrs +
            (componentAttrs.length ? '\n' : '') +
            '>\n' +
            indent(nodes) +
            '\n</' +
            componentName +
            '>';
    }

    serializedComponent = removeTrailingWhiteSpaces(serializedComponent);

    return serializedComponent;
};

const test: OldPlugin['test'] = (val) => !!val && typeof val === 'object' && 'componentRef' in val;

export = {
    print,
    test,
} as OldPlugin;
