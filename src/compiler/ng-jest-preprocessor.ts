import fs from 'fs';
import path from 'path';

import type { ParsedConfiguration } from '@angular/compiler-cli';
import type { TransformedSource } from '@jest/transform';
import { type TsCompilerInstance, stringify } from 'ts-jest';
import { updateOutput } from 'ts-jest/dist/legacy/compiler/compiler-utils';
import { factory as hoistJest } from 'ts-jest/dist/transformers/hoist-jest';
import ts from 'typescript';

import { constructorParametersDownlevelTransform } from '../transformers/downlevel-ctor';
import { replaceResourceTransformer } from '../transformers/replace-resources';
import { ngJestLogger } from '../utils/logger';

import { SourceFileCache } from './cache';
import { augmentHostWithCaching, augmentHostWithDependencyCollection } from './host';
import { createDiagnosticsReporter, type DiagnosticsReporter, formatDiagnostics } from './ng-jest-diagnostics';
import { normalizePath } from './paths';

type NgJestParsedConfig = Omit<ParsedConfiguration, 'emitFlags'>;

const calcProjectFileAndBasePath = (project: string): { projectFile: string; basePath: string } => {
  const absProject = path.resolve(project);
  const projectIsDir = fs.lstatSync(absProject).isDirectory();
  const projectFile = projectIsDir ? path.join(absProject, 'tsconfig.json') : absProject;
  const projectDir = projectIsDir ? absProject : path.dirname(absProject);
  const basePath = path.resolve(projectDir);

  return { projectFile, basePath };
};

const readConfiguration = (tsconfig?: string): NgJestParsedConfig => {
  try {
    const readConfigFile = (configFile: string) =>
      ts.readConfigFile(configFile, (file) => fs.readFileSync(path.resolve(file), 'utf-8'));

    const tsconfigPath = typeof tsconfig === 'string' ? tsconfig.replace('<rootDir>', '.') : process.cwd();
    const { projectFile, basePath } = calcProjectFileAndBasePath(tsconfigPath);
    const configFileName = path.resolve(path.normalize(process.cwd()), projectFile);
    const { config, error } = readConfigFile(projectFile);
    if (error) {
      return {
        project: tsconfigPath,
        errors: [error],
        rootNames: [],
        options: {},
      };
    }

    const existingCompilerOptions: ts.CompilerOptions = {
      genDir: basePath,
      basePath,
    };
    const {
      options,
      errors,
      fileNames: rootNames,
      projectReferences,
    } = ts.parseJsonConfigFileContent(config, ts.sys, basePath, existingCompilerOptions, configFileName);

    // Coerce to boolean as `enableIvy` can be `ngtsc|true|false|undefined` here.
    options.enableIvy = !!(options.enableIvy ?? true);
    options.noEmitOnError = false;
    options.outDir = undefined;
    options.suppressOutputPathCheck = true;
    options.inlineSources = options.sourceMap;
    options.inlineSourceMap = false;
    options.mapRoot = undefined;
    options.sourceRoot = undefined;
    options.allowEmptyCodegenFiles = false;
    options.annotationsAs = 'decorators';
    options.enableResourceInlining = false;
    options.module = options.module ?? ts.ModuleKind.CommonJS;
    options.target = options.target ?? ts.ScriptTarget?.ES2015;

    return { project: projectFile, rootNames, projectReferences, options, errors };
  } catch (e) {
    const errors: ts.Diagnostic[] = [
      {
        category: ts.DiagnosticCategory.Error,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messageText: (e as any).stack,
        file: undefined,
        start: undefined,
        length: undefined,
        source: 'angular',
        code: 500,
      },
    ];

    return { project: '', errors, rootNames: [], options: {} };
  }
};

const createJitTransformers = (builder: ts.BuilderProgram): ts.CustomTransformers => {
  const getTypeChecker = () => builder.getProgram().getTypeChecker();

  return {
    before: [
      replaceResourceTransformer(getTypeChecker),
      constructorParametersDownlevelTransform(builder.getProgram()),
      hoistJest({
        program: () => builder.getProgram(),
        configSet: { logger: ngJestLogger, compilerModule: ts },
      } as unknown as TsCompilerInstance),
    ],
  };
};

const getDiagnostics = (builder: ts.BuilderProgram, diagnosticsReporter: DiagnosticsReporter): void => {
  const diagnostics = [
    ...builder.getOptionsDiagnostics(),
    ...builder.getGlobalDiagnostics(),
    ...builder.getSyntacticDiagnostics(),
    // Gather incremental semantic diagnostics
    ...builder.getSemanticDiagnostics(),
  ];
  diagnosticsReporter(diagnostics);
};

export const getDiskPrecompiledOutputPath = (): string => path.join(__dirname, '../../.precompiledOutput');

class NgJestPreprocessor {
  private readonly sourceFileCache = new SourceFileCache();
  private readonly fileDependencies = new Map<string, Set<string>>();
  private oldBuilderProgram: ts.BuilderProgram | undefined;

  performCompile(tsconfigPath: string | undefined): void {
    const compiledOutput: Record<string, string> = Object.create(null);
    const diagnosticWarnings: Error[] = [];
    const diagnosticErrors: Error[] = [];
    const emittedFiles: Record<string, TransformedSource> = Object.create(null);
    const { options: compilerOptions, rootNames, errors, projectReferences } = readConfiguration(tsconfigPath);
    // Create diagnostics reporter and report configuration file errors
    const diagnosticsReporter = createDiagnosticsReporter(
      {
        warnings: diagnosticWarnings,
        errors: diagnosticErrors,
      },
      (diagnostic) => formatDiagnostics([diagnostic]),
    );
    diagnosticsReporter(errors);

    process.stdout.write('Creating compiler (phase: setup).\n');

    const host = ts.createIncrementalCompilerHost(compilerOptions, ts.sys);
    // Setup source file caching and reuse cache from previous compilation if present
    augmentHostWithCaching(host, this.sourceFileCache);
    const moduleResolutionCache = ts.createModuleResolutionCache(
      host.getCurrentDirectory(),
      host.getCanonicalFileName.bind(host),
      compilerOptions,
    );

    // Setup source file dependency collection
    augmentHostWithDependencyCollection(host, this.fileDependencies, moduleResolutionCache);

    // When not in watch mode, the startup cost of the incremental analysis can be avoided by
    // using an abstract builder that only wraps a TypeScript program.
    const builderProgram = ts.createAbstractBuilder(
      rootNames,
      compilerOptions,
      host,
      this.oldBuilderProgram,
      errors,
      projectReferences,
    );
    this.oldBuilderProgram = builderProgram;
    getDiagnostics(builderProgram, diagnosticsReporter);

    const transformers = createJitTransformers(builderProgram);

    process.stdout.write('Compiler creation complete.\n');

    process.stdout.write('Start compiling test sources.\n');

    builderProgram.emit(
      undefined,
      (fileName, data) => {
        const normalizedFileName = normalizePath(fileName);
        const tsVersionFileName = normalizedFileName.replace(fileName.endsWith('.js') ? '.js' : '.js.map', '.ts');
        const cachedEmittedFile = emittedFiles[tsVersionFileName] ?? Object.create(null);
        if (fileName.endsWith('.map')) {
          emittedFiles[tsVersionFileName] = {
            ...cachedEmittedFile,
            map: data,
          };

          return;
        } else if (fileName.endsWith('.js')) {
          emittedFiles[tsVersionFileName] = {
            code: data,
          };
          compiledOutput[tsVersionFileName] = updateOutput(
            data,
            tsVersionFileName,
            emittedFiles[tsVersionFileName].map as string | undefined,
          );
        }
      },
      undefined,
      undefined,
      transformers,
    );

    process.stdout.write('Test sources compilation complete.\n');

    ts.sys.writeFile(getDiskPrecompiledOutputPath(), stringify(compiledOutput));
  }
}

const ngJestPreprocessor = new NgJestPreprocessor();

export { ngJestPreprocessor };
