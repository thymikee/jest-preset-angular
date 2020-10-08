import type { TransformerFactory, SourceFile, TransformationContext, Program } from 'typescript';

function tryLoadV8V9Transformer(program: Program): TransformerFactory<SourceFile> | undefined {
  try {
    // eslint-disable-next-line
    const { downlevelConstructorParameters } = require('@ngtools/webpack/src/transformers/ctor-parameters');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return downlevelConstructorParameters(() => program.getTypeChecker());
  } catch (err) {
    return undefined;
  }
}

function tryLoadV10Transformer(program: Program): TransformerFactory<SourceFile> | undefined {
  try {
    // eslint-disable-next-line
    const { constructorParametersDownlevelTransform } = require('@angular/compiler-cli/src/tooling');

    return (context: TransformationContext) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const compilerCliFactory = constructorParametersDownlevelTransform(program);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return compilerCliFactory(context);
    };
  } catch (err) {
    return undefined;
  }
}

/**
 * @internal
 */
export function factory(program: Program): TransformerFactory<SourceFile> {
  // Depending on the used Angular version, we have to load the constructor parameters transformer from different locations

  // Angular v8/v9 downlevel constructor transformer
  let transformerFactory = tryLoadV8V9Transformer(program);

  // Angular v10+ downlevel constructor transformer
  if (transformerFactory === undefined) {
    transformerFactory = tryLoadV10Transformer(program);
  }

  if (transformerFactory === undefined) {
    throw new Error('Could not load Constructor Parameters Downlevel Transformer!');
  }

  return transformerFactory;
}
