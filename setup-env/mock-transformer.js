const {
    ɵɵdefineComponent,
    ɵɵdefineInjectable,
    ɵɵdefineDirective,
    ɵɵdefinePipe,
    ɵɵdefineNgModule,
} = require('@angular/core');

const cache = new Map();

function stubInjectable(target, { providedIn }) {
    target.ɵprov = ɵɵdefineInjectable({
        token: target,
        providedIn,
        factory: () => new target(),
    });
}

function stubComponent(target, actual) {
    const { selectors, exportAs, standalone, signals, ngContentSelectors, changeDetection } = actual;

    cache.set(
        actual,
        (target.ɵcmp =
            cache.get(actual) ??
            ɵɵdefineComponent({
                type: target,
                selectors,
                inputs: {},
                outputs: {},
                exportAs,
                standalone,
                signals,
                decls: 0,
                vars: 0,
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                template: () => {},
                ngContentSelectors,
                changeDetection,
            }))
    );
}

function stubDirective(target, { selectors, exportAs, standalone, signals }) {
    target.ɵdir = ɵɵdefineDirective({
        type: target,
        selectors,
        inputs: {},
        outputs: {},
        exportAs,
        standalone,
        signals,
    });
}

function stubPipe(target, { name, pure, standalone }) {
    target.ɵpipe = ɵɵdefinePipe({
        name,
        type: target,
        pure,
        standalone,
    });
}

jest.onGenerateMock((modulePath, moduleMock) => {
    const moduleActual = jest.requireActual(modulePath);

    function* walk(obj, walkedNodes = [], path = []) {
        if (!obj || (typeof obj !== 'function' && typeof obj !== 'object') || walkedNodes.includes(obj)) {
            return;
        }

        for (const key of Object.getOwnPropertyNames(obj)) {
            if (typeof key === 'string' && key.startsWith('ɵ')) {
                const pathFunction = (root) => {
                    return path.reduce((acc, k) => acc?.[k], root);
                };

                yield [key, pathFunction];

                continue;
            }

            yield* walk(obj[key], [...walkedNodes, obj], [...path, key]);
        }
    }

    function stubRecursive(mock, actual) {
        for (const [key, getParent] of walk(actual)) {
            const parentMock = getParent(mock);
            const parentActual = getParent(actual);
            const valueActual = parentActual[key];

            if (!parentMock || !valueActual) {
                continue;
            }

            switch (key) {
                case `ɵfac`: {
                    parentMock[key] = () => new parentMock();
                    break;
                }
                case `ɵprov`: {
                    stubInjectable(parentMock, valueActual);
                    break;
                }
                case `ɵcmp`: {
                    stubComponent(parentMock, valueActual);
                    break;
                }
                case `ɵdir`: {
                    stubDirective(parentMock, valueActual);
                    break;
                }
                case `ɵpipe`: {
                    stubPipe(parentMock, valueActual);
                    break;
                }
                case `ɵmod`: {
                    parentMock[key] = ɵɵdefineNgModule({
                        type: parentMock,
                        imports: valueActual.imports.map((actual) => {
                            const mock = jest.fn();

                            stubRecursive(mock, actual);

                            return mock;
                        }),
                        exports: valueActual.exports.map((actual) => {
                            const mock = jest.fn();

                            stubRecursive(mock, actual);

                            return mock;
                        }),
                        declarations: valueActual.declarations.map((actual) => {
                            const mock = jest.fn();

                            stubRecursive(mock, actual);

                            return mock;
                        }),
                    });
                    break;
                }
            }
        }
    }

    stubRecursive(moduleMock, moduleActual);

    return moduleMock;
});
