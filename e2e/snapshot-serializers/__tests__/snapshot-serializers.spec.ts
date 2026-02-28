import { TestBed } from '@angular/core/testing';

import serializer from '../../../build/serializers/ng-snapshot';
import { FooComponent } from '../foo.component';

describe('FooComponent', () => {
    test('should allow generating snapshot with removed component attributes with snapshot serializer option', () => {
        expect.addSnapshotSerializer({
            print: (val, print, indent, options, colors) =>
                serializer.print(
                    val,
                    print,
                    indent,
                    {
                        ...options,
                        omitAllCompAttrs: true,
                    },
                    colors,
                ),
            test: serializer.test,
        });
        TestBed.configureTestingModule({
            imports: [FooComponent],
        });
        const fixture = TestBed.createComponent(FooComponent);

        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
        expect(fixture.debugElement.nativeElement).toMatchSnapshot();
    });

    test('should allow generating snapshot', () => {
        expect.addSnapshotSerializer(serializer);
        TestBed.configureTestingModule({
            imports: [FooComponent],
        });
        const fixture = TestBed.createComponent(FooComponent);

        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
        expect(fixture.debugElement.nativeElement).toMatchSnapshot();
    });

    test('should not crash when serializing proxy values that fail primitive conversion', () => {
        expect.addSnapshotSerializer(serializer);
        TestBed.configureTestingModule({
            imports: [FooComponent],
        });
        const fixture = TestBed.createComponent(FooComponent);
        const proxyValue = new Proxy(() => undefined, {
            get(target, prop, receiver) {
                if (prop === 'constructor') {
                    return undefined;
                }

                if (prop === Symbol.toPrimitive) {
                    return () => {
                        throw new TypeError('Cannot convert object to primitive value');
                    };
                }

                return Reflect.get(target, prop, receiver);
            },
        });

        Object.defineProperty(fixture.componentInstance, 'signalFormProxy', {
            value: proxyValue,
            enumerable: true,
        });
        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
    });
});
