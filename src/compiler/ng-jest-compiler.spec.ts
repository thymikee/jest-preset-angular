import type { Config } from '@jest/types';
import type { RawCompilerOptions } from 'ts-jest';

import { NgJestCompiler } from './ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';

function dedent(strings: TemplateStringsArray, ...values: unknown[]) {
    let joinedString = '';
    for (let i = 0; i < values.length; i++) {
        joinedString += `${strings[i]}${values[i]}`;
    }
    joinedString += strings[strings.length - 1];

    return omitLeadingWhitespace(joinedString);
}

/** Omits the leading whitespace for each line of the given text. */
function omitLeadingWhitespace(text: string): string {
    return text.replace(/^\s+/gm, '');
}

function transformCjs(contents: string, compilerOptions: RawCompilerOptions = {}) {
    const ngJestConfig = new NgJestConfig({
        cwd: process.cwd(),
        extensionsToTreatAsEsm: [],
        testMatch: [],
        testRegex: [],
        globals: {
            'ts-jest': {
                isolatedModules: true,
                tsconfig: {
                    sourceMap: false,
                    module: 'CommonJS',
                    target: 'ES2017',
                    lib: ['dom', 'es2015'],
                    importHelpers: true,
                    experimentalDecorators: true,
                    emitDecoratorMetadata: false,
                    ...compilerOptions,
                },
            },
        },
    } as unknown as Config.ProjectConfig);
    const compiler = new NgJestCompiler(ngJestConfig, new Map());
    const { code, diagnostics = [] } = compiler.getCompiledOutput(contents, __filename, {
        watchMode: false,
        depGraphs: new Map(),
        supportsStaticESM: false,
    });

    return {
        code: omitLeadingWhitespace(code),
        diagnostics,
    };
}

describe('NgJestCompiler', () => {
    describe('_transpileOutput', () => {
        it('should downlevel decorators for @Injectable decorated class', () => {
            const { code, diagnostics = [] } = transformCjs(`
                import {Injectable} from '@angular/core';

                export class ClassInject {};

                @Injectable()
                export class MyService {
                    constructor(v: ClassInject) {}
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
                MyService.ctorParameters = () => [
                    { type: ClassInject }
                ];
                exports.MyService = MyService = tslib_1.__decorate([
                    (0, core_1.Injectable)()
                ], MyService);
            `);
        });

        it('should downlevel decorators for @Directive decorated class', () => {
            const { code, diagnostics } = transformCjs(`
                import {Directive} from '@angular/core';

                export class ClassInject {};

                @Directive()
                export class MyDir {
                    constructor(v: ClassInject) {}
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
               MyDir.ctorParameters = () => [
                    { type: ClassInject }
               ];
               exports.MyDir = MyDir = tslib_1.__decorate([
                    (0, core_1.Directive)()
               ], MyDir);
            `);
        });

        it('should downlevel decorators for @Component decorated class', () => {
            const { code, diagnostics } = transformCjs(`
               import {Component} from '@angular/core';

               export class ClassInject {};

               @Component({template: 'hello'})
               export class MyComp {
                    constructor(v: ClassInject) {}
               }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
               MyComp.ctorParameters = () => [
                    { type: ClassInject }
               ];
               exports.MyComp = MyComp = tslib_1.__decorate([
                    (0, core_1.Component)({ template: 'hello' })
               ], MyComp);
            `);
        });

        it('should downlevel decorators for @Pipe decorated class', () => {
            const { code, diagnostics } = transformCjs(`
                import {Pipe} from '@angular/core';

                export class ClassInject {};

                @Pipe({selector: 'hello'})
                export class MyPipe {
                    constructor(v: ClassInject) {}
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
                MyPipe.ctorParameters = () => [
                    { type: ClassInject }
                ];
                exports.MyPipe = MyPipe = tslib_1.__decorate([
                    (0, core_1.Pipe)({ selector: 'hello' })
                ], MyPipe);
            `);
        });

        it('should not downlevel non-Angular class decorators', () => {
            const { code, diagnostics } = transformCjs(`
                @SomeUnknownDecorator()
                export class MyClass {}
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
                exports.MyClass = MyClass = tslib_1.__decorate([
                    SomeUnknownDecorator()
                ], MyClass);
            `);
            expect(code).not.toContain('MyClass.decorators');
        });

        it('should not downlevel non-Angular class decorators generated by a builder', () => {
            const { code, diagnostics } = transformCjs(`
                @DecoratorBuilder().customClassDecorator
                export class MyClass {}
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
                exports.MyClass = MyClass = tslib_1.__decorate([
                    DecoratorBuilder().customClassDecorator
                ], MyClass);
            `);
            expect(code).not.toContain('MyClass.decorators');
        });

        it('should downlevel Angular-decorated class member', () => {
            const { code, diagnostics } = transformCjs(`
                import {Input} from '@angular/core';

                export class MyDir {
                    @Input() disabled: boolean = false;
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
                MyDir.propDecorators = {
                    disabled: [{ type: core_1.Input }]
                };
            `);
            expect(code).not.toContain('tslib');
        });

        // Regression test for a scenario where previously the class within a constructor body
        // would be processed twice, where the downleveled class is revisited accidentally and
        // caused invalid generation of the `ctorParameters` static class member.
        it('should not duplicate constructor parameters for classes part of constructor body', () => {
            // Note: the bug with duplicated/invalid generation only surfaces when the actual class
            // decorators are preserved and emitted by TypeScript itself. This setting is also
            // disabled within the CLI.
            const { code, diagnostics } = transformCjs(`
               import {Injectable} from '@angular/core';

               export class ZoneToken {}

               @Injectable()
               export class Wrapper {
                 constructor(y: ZoneToken) {
                   @Injectable()
                   class ShouldBeProcessed {
                     constructor(x: ZoneToken) {}
                   }
                 }
               }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
              let Wrapper = class Wrapper {
                    constructor(y) {
                        let ShouldBeProcessed = class ShouldBeProcessed {
                            constructor(x) { }
                        };
                        ShouldBeProcessed.ctorParameters = () => [
                            { type: ZoneToken }
                        ];
                        ShouldBeProcessed = tslib_1.__decorate([
                            (0, core_1.Injectable)()
                        ], ShouldBeProcessed);
                    }
              };
              exports.Wrapper = Wrapper;
            `);
        });

        // Angular is not concerned with type information for decorated class members. Instead,
        // the type is omitted. This also helps with server side rendering as DOM globals which
        // are used as types, do not load at runtime. https://github.com/angular/angular/issues/30586.
        it('should downlevel Angular-decorated class member but not preserve type', () => {
            const { code, diagnostics } = transformCjs(`
               import {Input} from '@angular/core';
               import {MyOtherClass} from './other-file';

               export class MyDir {
                 @Input() trigger: HTMLElement;
                 @Input() fromOtherFile: MyOtherClass;
               }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
               MyDir.propDecorators = {
                 trigger: [{ type: core_1.Input }],
                 fromOtherFile: [{ type: core_1.Input }]
               };
            `);
            expect(code).not.toContain('HTMLElement');
            expect(code).not.toContain('MyOtherClass');
        });

        it('should capture constructor type metadata with `emitDecoratorMetadata` disabled', () => {
            const { code, diagnostics } = transformCjs(`
                import {Directive} from '@angular/core';
                import {MyOtherClass} from './other-file';

                @Directive()
                export class MyDir {
                    constructor(other: MyOtherClass) {}
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain('const other_file_1 = require("./other-file");');
            expect(code).toContain(dedent`
                MyDir.ctorParameters = () => [
                    { type: other_file_1.MyOtherClass }
                ];
                exports.MyDir = MyDir = tslib_1.__decorate([
                    (0, core_1.Directive)()
                ], MyDir);
            `);
        });

        it('should properly serialize constructor parameter with local qualified name type', () => {
            const { code, diagnostics } = transformCjs(`
                import {Directive} from '@angular/core';

                namespace other {
                    export class OtherClass {}
                };

                @Directive()
                export class MyDir {
                    constructor(other: other.OtherClass) {}
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain('var other;');
            expect(code).toContain(dedent`
               MyDir.ctorParameters = () => [
                    { type: other.OtherClass }
               ];
               exports.MyDir = MyDir = tslib_1.__decorate([
                    (0, core_1.Directive)()
               ], MyDir);
            `);
        });

        it('should properly downlevel constructor parameter decorators with built-in lib types', () => {
            const { code, diagnostics } = transformCjs(`
                import {Inject, Directive, DOCUMENT} from '@angular/core';

                @Directive()
                export class MyDir {
                    constructor(@Inject(DOCUMENT) document: Document) {}
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
                MyDir.ctorParameters = () => [
                    { type: Document, decorators: [{ type: core_1.Inject, args: [core_1.DOCUMENT,] }] }
                ];
                exports.MyDir = MyDir = tslib_1.__decorate([
                    (0, core_1.Directive)()
                ], MyDir);
            `);
        });

        it('should properly downlevel constructor parameters with union type', () => {
            const { code, diagnostics } = transformCjs(`
                import {Optional, Directive, NgZone} from '@angular/core';

                @Directive()
                export class MyDir {
                    constructor(@Optional() ngZone: NgZone|null) {}
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
                MyDir.ctorParameters = () => [
                    { type: core_1.NgZone, decorators: [{ type: core_1.Optional }] }
                ];
                exports.MyDir = MyDir = tslib_1.__decorate([
                    (0, core_1.Directive)()
                ], MyDir);
            `);
        });

        it(
            'should not retain unused type imports due to decorator downleveling with ' +
                '`emitDecoratorMetadata` enabled.',
            () => {
                const { code, diagnostics } = transformCjs(
                    `
                        import {Directive, Inject} from '@angular/core';
                        import {ErrorHandler, ClassInject} from './external';

                        export class MyDir {
                            private _errorHandler: ErrorHandler;
                            constructor(@Inject(ClassInject) i: ClassInject) {}
                        }
                    `,
                    { module: 'ES2015', emitDecoratorMetadata: true },
                );

                expect(diagnostics.length).toBe(0);
                expect(code).not.toContain('Directive');
                expect(code).not.toContain('ErrorHandler');
            },
        );

        it(
            'should not retain unused type imports due to decorator downleveling with ' +
                '`emitDecoratorMetadata` disabled',
            () => {
                const { code, diagnostics } = transformCjs(
                    `
                       import {Directive, Inject} from '@angular/core';
                       import {ErrorHandler, ClassInject} from './external';

                       export class MyDir {
                            private _errorHandler: ErrorHandler;
                            constructor(@Inject(ClassInject) i: ClassInject) {}
                       }
                 `,
                    { module: 'ES2015', emitDecoratorMetadata: false },
                );

                expect(diagnostics.length).toBe(0);
                expect(code).not.toContain('Directive');
                expect(code).not.toContain('ErrorHandler');
            },
        );

        it('should not generate invalid reference due to conflicting parameter name', () => {
            const { code, diagnostics } = transformCjs(
                `
                    import {Directive} from '@angular/core';
                    import {Dep} from './external';

                    @Directive()
                    export class MyDir {
                        constructor(Dep: Dep) {
                            Dep.greet();
                        }
                    }
                `,
                { emitDecoratorMetadata: false },
            );

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(`external_1 = require("./external");`);
            expect(code).toContain(dedent`
                MyDir.ctorParameters = () => [
                    { type: external_1.Dep }
                ];
                exports.MyDir = MyDir = tslib_1.__decorate([
                    (0, core_1.Directive)()
                ], MyDir);
            `);
        });

        it('should be able to serialize circular constructor parameter type', () => {
            const { code, diagnostics } = transformCjs(`
                import {Directive, Optional, Inject, SkipSelf} from '@angular/core';

                @Directive()
                export class MyDir {
                    constructor(@Optional() @SkipSelf() @Inject(MyDir) parentDir: MyDir|null) {}
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
                let MyDir = class MyDir {
                    constructor(parentDir) { }
                };
                exports.MyDir = MyDir;
                MyDir.ctorParameters = () => [
                    { type: MyDir, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf }, { type: core_1.Inject, args: [MyDir,] }] }
                ];
                exports.MyDir = MyDir = tslib_1.__decorate([
                    (0, core_1.Directive)()
                ], MyDir);
            `);
        });

        it('should capture a non-const enum used as a constructor type', () => {
            const { code, diagnostics } = transformCjs(`
                import {Component} from '@angular/core';

                export enum Values {A, B};

                @Component({template: 'hello'})
                export class MyComp {
                    constructor(v: Values) {}
                }
            `);

            expect(diagnostics.length).toBe(0);
            expect(code).toContain(dedent`
                MyComp.ctorParameters = () => [
                    { type: Values }
                ];
                exports.MyComp = MyComp = tslib_1.__decorate([
                    (0, core_1.Component)({ template: 'hello' })
                ], MyComp);
            `);
        });
    });
});
