import type * as ts from 'typescript';

/**
 * Copy from https://github.com/angular/angular-cli/blob/master/packages/ngtools/webpack/src/ivy/cache.ts
 */
export class SourceFileCache extends Map<string, ts.SourceFile> {
  readonly #angularDiagnostics = new Map<ts.SourceFile, ts.Diagnostic[]>();

  invalidate(file: string): void {
    const sourceFile = this.get(file);
    if (sourceFile) {
      this.delete(file);
      this.#angularDiagnostics.delete(sourceFile);
    }
  }

  updateAngularDiagnostics(sourceFile: ts.SourceFile, diagnostics: ts.Diagnostic[]): void {
    if (diagnostics.length > 0) {
      this.#angularDiagnostics.set(sourceFile, diagnostics);
    } else {
      this.#angularDiagnostics.delete(sourceFile);
    }
  }

  getAngularDiagnostics(sourceFile: ts.SourceFile): ts.Diagnostic[] | undefined {
    return this.#angularDiagnostics.get(sourceFile);
  }
}
