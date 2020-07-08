import type {
  TransformerFactory,
  SourceFile,
  TransformationContext,
  Program,
} from "typescript";
import { ConfigSet } from "ts-jest/dist/config/config-set";

function tryLoadV8V9Transformer(
  program: Program
): TransformerFactory<SourceFile> | undefined {
  try {
    const {
      downlevelConstructorParameters,
    } = require("@ngtools/webpack/src/transformers/ctor-parameters");

    return downlevelConstructorParameters(() => program.getTypeChecker());
  } catch (err) {
    return undefined;
  }
}

function tryLoadV10Transformer(
  program: Program
): TransformerFactory<SourceFile> | undefined {
  try {
    const {
      constructorParametersDownlevelTransform,
    } = require("@angular/compiler-cli/src/tooling");

    return (context: TransformationContext) => {
      const compilerCliFactory = constructorParametersDownlevelTransform(
        program
      );
      return compilerCliFactory(context);
    };
  } catch (err) {
    return undefined;
  }
}

/**
 * The factory of hoisting transformer factory
 * @internal
 */
export function factory(configSet: ConfigSet): TransformerFactory<SourceFile> {
  const { program } = configSet.tsCompiler;
  if (!program) {
    throw new Error(
      "TypeScript Compiler module is not provided! Please do not use the `AngularConstructorParametersTransformer` with `isolatedModules: true`"
    );
  }

  // Depending on the used Angular version, we have to load the constructor parameters transformer from different locations

  // Angular v8/v9 downlevel constructor transformer
  let transformerFactory = tryLoadV8V9Transformer(program);

  // Angular v10+ downlevel constructor transformer
  if (transformerFactory === undefined) {
    transformerFactory = tryLoadV10Transformer(program);
  }

  if (transformerFactory === undefined) {
    throw new Error(
      "Could not load Constructor Parameters Downlevel Transformer!"
    );
  }

  return transformerFactory;
}
