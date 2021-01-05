/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';

import { STYLES, STYLE_URLS, TEMPLATE_URL, TEMPLATE, REQUIRE, COMPONENT } from '../constants';

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
export function replaceResources(
  shouldTransform: (fileName: string) => boolean,
  getTypeChecker: () => ts.TypeChecker,
): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    const typeChecker = getTypeChecker();
    const resourceImportDeclarations: ts.ImportDeclaration[] = [];
    const moduleKind = context.getCompilerOptions().module;
    const visitNode: ts.Visitor = (node: ts.Node) => {
      if (ts.isClassDeclaration(node)) {
        const decorators = ts.visitNodes(node.decorators, (node) =>
          ts.isDecorator(node) ? visitDecorator(node, typeChecker, resourceImportDeclarations, moduleKind) : node,
        );

        return ts.updateClassDeclaration(
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
        return ts.updateSourceFileNode(
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

  // visit all properties
  let properties = ts.visitNodes(objectExpression.properties, (node) =>
    ts.isObjectLiteralElementLike(node) ? visitComponentMetadata(node, resourceImportDeclarations, moduleKind) : node,
  );

  // replace properties with updated properties
  const styleProperty = ts.createPropertyAssignment(ts.createIdentifier(STYLES), ts.createArrayLiteral([]));

  properties = ts.createNodeArray([...properties, styleProperty]);

  return ts.updateDecorator(
    node,
    ts.updateCall(decoratorFactory, decoratorFactory.expression, decoratorFactory.typeArguments, [
      ts.updateObjectLiteral(objectExpression, properties),
    ]),
  );
}

function visitComponentMetadata(
  node: ts.ObjectLiteralElementLike,
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
      // eslint-disable-next-line no-case-declarations
      const importName = createResourceImport(node.initializer, resourceImportDeclarations, moduleKind);
      if (!importName) {
        return node;
      }

      return ts.updatePropertyAssignment(node, ts.createIdentifier(TEMPLATE), importName);
    case STYLES:
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
  node: ts.Node,
  resourceImportDeclarations: ts.ImportDeclaration[],
  moduleKind = ts.ModuleKind.ES2015,
): ts.Identifier | ts.Expression | null {
  const url = getResourceUrl(node);
  if (!url) {
    return null;
  }

  const urlLiteral = ts.createLiteral(url);
  if (moduleKind < ts.ModuleKind.ES2015) {
    return ts.createCall(
      /* expression */ ts.createIdentifier(REQUIRE),
      /* type arguments */ undefined,
      /* arguments array */ [urlLiteral],
    );
  } else {
    const importName = ts.createIdentifier(`__NG_CLI_RESOURCE__${resourceImportDeclarations.length}`);
    resourceImportDeclarations.push(
      ts.createImportDeclaration(undefined, undefined, ts.createImportClause(importName, undefined), urlLiteral),
    );

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
