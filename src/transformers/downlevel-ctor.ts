import { getInputSignalsMetadataTransform } from '@angular/compiler-cli/src/transformers/jit_transforms';
import type ts from 'typescript';

import { TypeScriptReflectionHost } from '../ngtsc/reflection';

import { getDownlevelDecoratorsTransform } from './downlevel_decorators_transform';

export const constructorParametersDownlevelTransform = (program: ts.Program): ts.TransformerFactory<ts.SourceFile> => {
  const typeChecker = program.getTypeChecker();
  const reflectionHost = new TypeScriptReflectionHost(typeChecker);
  const inputSignalMetadataTransform = getInputSignalsMetadataTransform(reflectionHost, false);

  return (ctx) => {
    return (sourceFile) => {
      if (inputSignalMetadataTransform) {
        sourceFile = inputSignalMetadataTransform(ctx)(sourceFile);
      }
      sourceFile = getDownlevelDecoratorsTransform(typeChecker, reflectionHost, [], false, false, true)(ctx)(
        sourceFile,
      );

      return sourceFile;
    };
  };
};
