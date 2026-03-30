import { format } from 'pretty-format';

import noNgAttr from './no-ng-attributes';

describe('no-ng-attributes snapshot serializer', () => {
    test('should return true when matching the condition with attributes to remove', () => {
        const validElement = document.createElement('DIV');
        ['ng-reflect', '_nghost', '_ngcontent', 'ng-version'].forEach((attrToRemove) => {
            validElement.setAttribute(attrToRemove, 'foo');
        });

        expect(noNgAttr.test(validElement)).toBe(true);

        validElement.remove();
    });

    test('should return true when matching the condition with attributes to clean', () => {
        const validElement = document.createElement('SECTION');
        ['class', 'id', 'for', 'name', 'aria-owns', 'aria-labelledby', 'aria-controls'].forEach((attrToClean) => {
            validElement.setAttribute(attrToClean, 'foo');
        });

        expect(noNgAttr.test(validElement)).toBe(true);

        validElement.remove();
    });

    test('should strip dynamic name, id, for, and aria-* attribute values when serializing', () => {
        const el = document.createElement('div');
        el.setAttribute('name', 'mat-button-toggle-group-a0');
        el.setAttribute('id', 'cdk-step-content-0-0');
        el.setAttribute('for', 'mat-form-field-label-9');
        el.setAttribute('aria-owns', 'mat-input-4');
        el.setAttribute('aria-labelledby', 'cdk-step-label-0-0');
        el.setAttribute('aria-controls', 'cdk-step-content-2-0');
        el.setAttribute('class', 'my-class ng-tns-c25-1 ng-star-inserted');
        el.setAttribute('data-testid', 'keep-me');

        const output = format(el, { plugins: [noNgAttr] });

        expect(output).not.toContain('mat-button-toggle-group-a0');
        expect(output).not.toContain('cdk-step-content-0-0');
        expect(output).not.toContain('mat-form-field-label-9');
        expect(output).not.toContain('mat-input-4');
        expect(output).not.toContain('cdk-step-label-0-0');
        expect(output).not.toContain('cdk-step-content-2-0');
        expect(output).not.toContain('ng-tns-c25-1');
        expect(output).not.toContain('ng-star-inserted');
        expect(output).toContain('my-class');
        expect(output).toContain('data-testid="keep-me"');

        el.remove();
    });

    test('should strip a.form*.value name pattern when serializing', () => {
        const el = document.createElement('input');
        el.setAttribute('name', 'a.form94.value');

        const output = format(el, { plugins: [noNgAttr] });

        expect(output).not.toContain('a.form94.value');
        expect(output).not.toContain('name=');

        el.remove();
    });

    test.each([undefined, null, 1, document.createElement('INPUT')])(
        'should return false when not matching the condition',
        (val) => {
            expect(noNgAttr.test(val)).toBe(false);
        },
    );
});
