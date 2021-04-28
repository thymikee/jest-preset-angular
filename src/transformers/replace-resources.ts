/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import type { TsCompilerInstance } from 'ts-jest/dist/types';
import ts from 'typescript';

import { STYLES, STYLE_URLS, TEMPLATE_URL, TEMPLATE, REQUIRE, COMPONENT } from '../constants';

const useNodeFactory = +ts.versionMajorMinor >= 4.0;
const shouldTransform = (fileName: string) => !fileName.endsWith('.ngfactory.ts') && !fileName.endsWith('.ngstyle.ts');
/**
 * Source https://github.com/angular/angular-cli/blob/master/packages/ngtools/webpack/src/transformers/replace_resources.ts
 *
 * Check `@Component` to do following things:
 * - Replace `templateUrl` path with `require` for `CommonJS` or a constant with `import` for `ESM`
 * - Combine `styles` and `styleUrls` to become `styles` with empty array as value because we don't test css
 *
 * @example
 *
 * Given the input
 * @Component({
 *   selector: 'foo',
 *   templateUrl: './foo.component.html`,
 *   styleUrls: ['./foo.component.scss'],
 *   styles: [`h1 { font-size: 16px }`],
 * })
 *
 * Produced the output for `CommonJS`
 * @Component({
 *   selector: 'foo',
 *   templateUrl: require('./foo.component.html'),
 *   styles: [],
 * })
 *
 * or for `ESM`
 * import __NG_CLI_RESOURCE__0 from './foo.component.html';
 *
 * @Component({
 *   selector: 'foo',
 *   templateUrl: __NG_CLI_RESOURCE__0,
 *   styles: [],
 * })
 */
export function replaceResources({ program }: TsCompilerInstance): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const typeChecker = program!.getTypeChecker();
    const resourceImportDeclarations: ts.ImportDeclaration[] = [];
    const moduleKind = context.getCompilerOptions().module;
    const visitNode: ts.Visitor = (node: ts.Node) => {
      if (ts.isClassDeclaration(node)) {
        const decorators = ts.visitNodes(node.decorators, (node) =>
          ts.isDecorator(node)
            ? visitDecorator(context.factory, node, typeChecker, resourceImportDeclarations, moduleKind)
            : node,
        );

        return useNodeFactory
          ? context.factory.updateClassDeclaration(
              node,
              decorators,
              node.modifiers,
              node.name,
              node.typeParameters,
              node.heritageClauses,
              node.members,
            )
          : ts.updateClassDeclaration(
              node,
              decorators,
              node.modifiers,
              node.name,
              node.typeParameters,
              node.heritageClauses,
              node.members,
            );
      }

      return ts.visitEachChild(node, visitNode, context);
    };

    return (sourceFile: ts.SourceFile) => {
      if (!shouldTransform(sourceFile.fileName)) {
        return sourceFile;
      }

      const updatedSourceFile = ts.visitNode(sourceFile, visitNode);
      if (resourceImportDeclarations.length) {
        // Add resource imports
        return useNodeFactory
          ? context.factory.updateSourceFile(
              updatedSourceFile,
              ts.setTextRange(
                context.factory.createNodeArray([...resourceImportDeclarations, ...updatedSourceFile.statements]),
                updatedSourceFile.statements,
              ),
            )
          : ts.updateSourceFileNode(
              updatedSourceFile,
              ts.setTextRange(
                ts.createNodeArray([...resourceImportDeclarations, ...updatedSourceFile.statements]),
                updatedSourceFile.statements,
              ),
            );
      }

      return updatedSourceFile;
    };
  };
}

function visitDecorator(
  nodeFactory: ts.NodeFactory,
  node: ts.Decorator,
  typeChecker: ts.TypeChecker,
  resourceImportDeclarations: ts.ImportDeclaration[],
  moduleKind?: ts.ModuleKind,
): ts.Decorator {
  if (!isComponentDecorator(node, typeChecker)) {
    return node;
  }

  if (!ts.isCallExpression(node.expression)) {
    return node;
  }

  const decoratorFactory = node.expression;
  const args = decoratorFactory.arguments;
  if (args.length !== 1 || !ts.isObjectLiteralExpression(args[0])) {
    // Unsupported component metadata
    return node;
  }

  const objectExpression = args[0] as ts.ObjectLiteralExpression;
  const styleReplacements: ts.Expression[] = [];

  // visit all properties
  let properties = ts.visitNodes(objectExpression.properties, (node) =>
    ts.isObjectLiteralElementLike(node)
      ? visitComponentMetadata(nodeFactory, node, styleReplacements, resourceImportDeclarations, moduleKind)
      : node,
  );

  // replace properties with updated properties
  if (styleReplacements.length) {
    const styleProperty = useNodeFactory
      ? nodeFactory.createPropertyAssignment(
          nodeFactory.createIdentifier(STYLES),
          nodeFactory.createArrayLiteralExpression(styleReplacements),
        )
      : ts.createPropertyAssignment(ts.createIdentifier(STYLES), ts.createArrayLiteral(styleReplacements));

    properties = useNodeFactory
      ? nodeFactory.createNodeArray([...properties, styleProperty])
      : ts.createNodeArray([...properties, styleProperty]);
  }

  return useNodeFactory
    ? nodeFactory.updateDecorator(
        node,
        nodeFactory.updateCallExpression(
          decoratorFactory,
          decoratorFactory.expression,
          decoratorFactory.typeArguments,
          [nodeFactory.updateObjectLiteralExpression(objectExpression, properties)],
        ),
      )
    : ts.updateDecorator(
        node,
        ts.updateCall(decoratorFactory, decoratorFactory.expression, decoratorFactory.typeArguments, [
          ts.updateObjectLiteral(objectExpression, properties),
        ]),
      );
}

function visitComponentMetadata(
  nodeFactory: ts.NodeFactory,
  node: ts.ObjectLiteralElementLike,
  styleReplacements: ts.Expression[],
  resourceImportDeclarations: ts.ImportDeclaration[],
  moduleKind?: ts.ModuleKind,
): ts.ObjectLiteralElementLike | undefined {
  if (!ts.isPropertyAssignment(node) || ts.isComputedPropertyName(node.name)) {
    return node;
  }

  const name = node.name.text;
  switch (name) {
    case 'moduleId':
      return undefined;

    case TEMPLATE_URL:
      const url = getResourceUrl(node.initializer);
      if (!url) {
        return node;
      }
      const importName = createResourceImport(nodeFactory, url, resourceImportDeclarations, moduleKind);
      if (!importName) {
        return node;
      }

      return useNodeFactory
        ? nodeFactory.updatePropertyAssignment(node, nodeFactory.createIdentifier(TEMPLATE), importName)
        : ts.updatePropertyAssignment(node, ts.createIdentifier(TEMPLATE), importName);

    case STYLES:
      if (!ts.isArrayLiteralExpression(node.initializer)) {
        return node;
      }
      const isInlineStyles = name === STYLES;
      // @ts-expect-error should be fine
      const styles = ts.visitNodes(node.initializer.elements, (node) => {
        if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) {
          return node;
        }

        let url;
        if (isInlineStyles) {
          return useNodeFactory ? nodeFactory.createStringLiteral(node.text) : ts.createLiteral(node.text);
        } else {
          url = getResourceUrl(node);
        }

        if (!url) {
          return node;
        }

        return createResourceImport(nodeFactory, url, resourceImportDeclarations, moduleKind);
      });

      // Styles should be placed first
      if (isInlineStyles) {
        styleReplacements.unshift(...styles);
      } else {
        styleReplacements.push(...styles);
      }

      return undefined;
    case STYLE_URLS:
      if (!ts.isArrayLiteralExpression(node.initializer)) {
        return node;
      }

      return undefined;
    default:
      return node;
  }
}

export function getResourceUrl(node: ts.Node): string | null {
  // only analyze strings
  if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) {
    return null;
  }

  return `${/^\.?\.\//.test(node.text) ? '' : './'}${node.text}`;
}

function isComponentDecorator(node: ts.Node, typeChecker: ts.TypeChecker): node is ts.Decorator {
  if (!ts.isDecorator(node)) {
    return false;
  }

  const origin = getDecoratorOrigin(node, typeChecker);

  return !!(origin && origin.module === '@angular/core' && origin.name === COMPONENT);
}

function createResourceImport(
  nodeFactory: ts.NodeFactory,
  url: string,
  resourceImportDeclarations: ts.ImportDeclaration[],
  moduleKind = ts.ModuleKind.ES2015,
): ts.Identifier | ts.Expression | null {
  const urlLiteral = useNodeFactory ? nodeFactory.createStringLiteral(url) : ts.createLiteral(url);
  if (moduleKind < ts.ModuleKind.ES2015) {
    return useNodeFactory
      ? nodeFactory.createCallExpression(nodeFactory.createIdentifier(REQUIRE), [], [urlLiteral])
      : ts.createCall(ts.createIdentifier(REQUIRE), undefined, [urlLiteral]);
  } else {
    const importName = ts.createIdentifier(`__NG_CLI_RESOURCE__${resourceImportDeclarations.length}`);
    const importDeclaration = useNodeFactory
      ? nodeFactory.createImportDeclaration(
          undefined,
          undefined,
          nodeFactory.createImportClause(false, importName, undefined),
          urlLiteral,
        )
      : ts.createImportDeclaration(undefined, undefined, ts.createImportClause(importName, undefined), urlLiteral);
    resourceImportDeclarations.push(importDeclaration);

    return importName;
  }
}

interface DecoratorOrigin {
  name: string;
  module: string;
}

function getDecoratorOrigin(decorator: ts.Decorator, typeChecker: ts.TypeChecker): DecoratorOrigin | null {
  if (!ts.isCallExpression(decorator.expression)) {
    return null;
  }

  let identifier: ts.Node;
  let name = '';

  if (ts.isPropertyAccessExpression(decorator.expression.expression)) {
    identifier = decorator.expression.expression.expression;
    name = decorator.expression.expression.name.text;
  } else if (ts.isIdentifier(decorator.expression.expression)) {
    identifier = decorator.expression.expression;
  } else {
    return null;
  }

  // NOTE: resolver.getReferencedImportDeclaration would work as well but is internal
  const symbol = typeChecker.getSymbolAtLocation(identifier);
  if (symbol && symbol.declarations && symbol.declarations.length > 0) {
    const declaration = symbol.declarations[0];
    let module: string;

    if (ts.isImportSpecifier(declaration)) {
      name = (declaration.propertyName || declaration.name).text;
      module = (declaration.parent.parent.parent.moduleSpecifier as ts.Identifier).text;
    } else if (ts.isNamespaceImport(declaration)) {
      // Use the name from the decorator namespace property access
      module = (declaration.parent.parent.moduleSpecifier as ts.Identifier).text;
    } else if (ts.isImportClause(declaration)) {
      name = (declaration.name as ts.Identifier).text;
      module = (declaration.parent.moduleSpecifier as ts.Identifier).text;
    } else {
      return null;
    }

    return { name, module };
  }

  return null;
}
