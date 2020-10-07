import type { Diagnostic, Diagnostics } from '@angular/compiler-cli';
import { CancellationToken, DiagnosticMode, hasErrors } from '@ngtools/webpack/src/diagnostics';
import type * as ts from 'typescript';

/**
 * Copy from `@ngtools/webpack` and strip out stuffs
 */
export function gatherDiagnostics(
  program: ts.Program,
  mode = DiagnosticMode.All,
  cancellationToken?: CancellationToken,
): Diagnostics {
  const allDiagnostics: Array<ts.Diagnostic | Diagnostic> = [];
  let checkOtherDiagnostics = true;

  // eslint-disable-next-line @typescript-eslint/ban-types
  function checkDiagnostics<T extends Function>(fn: T) {
    if (checkOtherDiagnostics) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const diags = fn(undefined, cancellationToken);
      if (diags) {
        allDiagnostics.push(...diags);

        checkOtherDiagnostics = !hasErrors(diags);
      }
    }
  }

  const gatherSyntacticDiagnostics = (mode & DiagnosticMode.Syntactic) != 0;
  const gatherSemanticDiagnostics = (mode & DiagnosticMode.Semantic) != 0;
  const tsProgram = program;
  if (gatherSyntacticDiagnostics) {
    // Check syntactic diagnostics.
    checkDiagnostics(tsProgram.getSyntacticDiagnostics.bind(tsProgram));
  }
  if (gatherSemanticDiagnostics) {
    checkDiagnostics(tsProgram.getSemanticDiagnostics.bind(tsProgram));
  }

  return allDiagnostics;
}
