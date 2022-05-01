import ts from 'typescript';

const ERROR_CODE_MATCHER = /(\u001b\[\d+m ?)TS-99(\d+: ?\u001b\[\d+m)/g;

/**
 * During formatting of `ts.Diagnostic`s, the numeric code of each diagnostic is prefixed with the
 * hard-coded "TS" prefix. For Angular's own error codes, a prefix of "NG" is desirable. To achieve
 * this, all Angular error codes start with "-99" so that the sequence "TS-99" can be assumed to
 * correspond with an Angular specific error code. This function replaces those occurrences with
 * just "NG".
 *
 * @param errors The formatted diagnostics
 */
const replaceTsWithNgInErrors = (errors: string): string => {
  return errors.replace(ERROR_CODE_MATCHER, '$1NG$2');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTsDiagnostic = (diagnostic: any): diagnostic is ts.Diagnostic => {
  return !!diagnostic && diagnostic.source !== 'angular';
};

const defaultFormatHost: ts.FormatDiagnosticsHost = {
  getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
  getCanonicalFileName: (fileName) => fileName,
  getNewLine: () => ts.sys.newLine,
};

type Diagnostics = readonly ts.Diagnostic[];

export const formatDiagnostics = (diags: Diagnostics, host: ts.FormatDiagnosticsHost = defaultFormatHost): string => {
  if (diags.length) {
    return diags
      .map((diagnostic) => {
        if (isTsDiagnostic(diagnostic)) {
          return replaceTsWithNgInErrors(ts.formatDiagnosticsWithColorAndContext([diagnostic], host));
        } else {
          return ts.formatDiagnostics(diagnostic, host);
        }
      })
      .join('');
  } else {
    return '';
  }
};

interface NgJestCompilation {
  warnings: Error[];
  errors: Error[];
}

export type DiagnosticsReporter = (diagnostics: Diagnostics) => void;

export const createDiagnosticsReporter = (
  compilation: NgJestCompilation,
  formatter: (diagnostic: Diagnostics[number]) => string,
): DiagnosticsReporter => {
  return (diagnostics) => {
    for (const diagnostic of diagnostics) {
      const text = formatter(diagnostic);
      if (diagnostic.category === ts.DiagnosticCategory.Error) {
        addError(compilation, text);
      } else {
        addWarning(compilation, text);
      }
    }
  };
};

const addWarning = (compilation: NgJestCompilation, message: string): void => {
  compilation.warnings.push(new Error(message));
};

const addError = (compilation: NgJestCompilation, message: string): void => {
  compilation.errors.push(new Error(message));
};
