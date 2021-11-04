import type ts from 'typescript';

import { TypeScriptReflectionHost } from '../ngtsc/reflection';

import { getDownlevelDecoratorsTransform } from './downlevel_decorators_transform';

export const constructorParametersDownlevelTransform = (program: ts.Program): ts.TransformerFactory<ts.SourceFile> => {
  const typeChecker = program.getTypeChecker();
  const reflectionHost = new TypeScriptReflectionHost(typeChecker);

  return getDownlevelDecoratorsTransform(typeChecker, reflectionHost, [], false, false, true);
};
