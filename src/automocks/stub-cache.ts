import { Type, ɵComponentDef, ɵDirectiveDef, ɵNgModuleDef, ɵPipeDef } from '@angular/core';

export class StubCache {
    private readonly componentsCache = new WeakMap<Type<unknown>, ɵComponentDef<unknown>>();
    private readonly directivesCache = new WeakMap<Type<unknown>, ɵDirectiveDef<unknown>>();
    private readonly pipesCache = new WeakMap<Type<unknown>, ɵPipeDef<unknown>>();
    private readonly modulesCache = new WeakMap<Type<unknown>, ɵNgModuleDef<unknown>>();
    private readonly mocks = new WeakMap<Type<unknown>, Type<unknown>>();

    public getOrCreateComponentDef<T>(actual: Type<T>, notFoundValueFactory: () => ɵComponentDef<T>): ɵComponentDef<T> {
        if (!this.componentsCache.has(actual)) {
            this.componentsCache.set(actual, notFoundValueFactory());
        }

        return this.componentsCache.get(actual) as ɵComponentDef<T>;
    }

    public getOrCreateDirectiveDef<T>(actual: Type<T>, notFoundValueFactory: () => ɵDirectiveDef<T>): ɵDirectiveDef<T> {
        if (!this.directivesCache.has(actual)) {
            this.directivesCache.set(actual, notFoundValueFactory());
        }

        return this.directivesCache.get(actual) as ɵDirectiveDef<T>;
    }

    public getOrCreatePipeDef<T>(actual: Type<T>, notFoundValueFactory: () => ɵPipeDef<T>): ɵPipeDef<T> {
        if (!this.pipesCache.has(actual)) {
            this.pipesCache.set(actual, notFoundValueFactory());
        }

        return this.pipesCache.get(actual) as ɵPipeDef<T>;
    }

    public getOrCreateModuleDef<T>(actual: Type<T>, notFoundValueFactory: () => ɵNgModuleDef<T>): ɵNgModuleDef<T> {
        if (!this.modulesCache.has(actual)) {
            this.modulesCache.set(actual, notFoundValueFactory());
        }

        return this.modulesCache.get(actual) as ɵNgModuleDef<T>;
    }

    public getMock<T>(actual: Type<T>, notFoundValueFactory: () => Type<T>): Type<T> {
        return (this.mocks.get(actual) as Type<T>) ?? notFoundValueFactory();
    }

    public setMock<T>(actual: Type<T>, mock: Type<T>): void {
        this.mocks.set(actual, mock);
    }
}
