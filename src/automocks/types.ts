import { Type, ɵComponentDef, ɵDirectiveDef, ɵNgModuleDef, ɵPipeDef, ɵɵInjectableDeclaration } from '@angular/core';

export interface ComponentType<T> extends Type<T> {
    ɵcmp: ɵComponentDef<T>;
    ɵfac: () => T;
}

export interface DirectiveType<T> extends Type<T> {
    ɵdir: ɵDirectiveDef<T>;
    ɵfac: () => T;
}

export interface PipeType<T> extends Type<T> {
    ɵpipe: ɵPipeDef<T>;
    ɵfac: () => T;
}

export interface ModuleType<T> extends Type<T> {
    ɵmod: ɵNgModuleDef<T>;
    ɵfac: () => T;
}

export interface InjectableType<T> extends Type<T> {
    ɵprov: ɵɵInjectableDeclaration<T>;
    ɵfac: () => T;
}

export enum InputFlags {
    None = 0,
    SignalBased = 1,
    HasDecoratorInputTransform = 2,
}
