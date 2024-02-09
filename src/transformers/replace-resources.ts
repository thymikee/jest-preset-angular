/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import type { TsCompilerInstance } from 'ts-jest';
import ts from 'typescript';

import { STYLES, STYLE_URLS, TEMPLATE_URL, TEMPLATE, REQUIRE, COMPONENT, STYLE_URL } from '../constants';

const isAfterVersion = (targetMajor: number, targetMinor: number): boolean => {
  const [major, minor] = ts.versionMajorMinor.split('.').map((part) => parseInt(part));

  if (major < targetMajor) {
    return false;
  } else if (major > targetMajor) {
    return true;
  } else {
    return minor >= targetMinor;
  }
};

const IS_TS_48 = isAfterVersion(4, 8);

/** Whether the current TypeScript version is after 5.0. */
const IS_AFTER_TS_50 = isAfterVersion(5, 0);

const shouldTransform = (fileName: string) => !fileName.endsWith('.ngfactory.ts') && !fileName.endsWith('.ngstyle.ts');
/**
 * Source https://github.com/angular/angular-cli/blob/master/packages/ngtools/webpack/src/transformers/replace_resources.ts
 *
 * Check `@Component` to do following things:
 * - Replace `templateUrl` path with `require` for `CommonJS` or a constant with `import` for `ESM`
 * - Remove `styles` and `styleUrls` because we don't test css
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
 * })
 *
 * or for `ESM`
 * import __NG_CLI_RESOURCE__0 from './foo.component.html';
 *
 * @Component({
 *   selector: 'foo',
 *   templateUrl: __NG_CLI_RESOURCE__0,
 * })
 */
export function replaceResources({ program }: TsCompilerInstance): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const typeChecker = program!.getTypeChecker();
    const resourceImportDeclarations: ts.ImportDeclaration[] = [];
    const moduleKind = context.getCompilerOptions().module;
    const nodeFactory = context.factory;

    const visitNode: ts.Visitor = (node: ts.Node) => {
      if (ts.isClassDeclaration(node)) {
        return visitClassDeclaration(nodeFactory, typeChecker, node, resourceImportDeclarations, moduleKind);
      }

      return ts.visitEachChild(node, visitNode, context);
    };

    return (sourceFile: ts.SourceFile) => {
      if (!shouldTransform(sourceFile.fileName)) {
        return sourceFile;
      }

      const updatedSourceFile = ts.visitNode(sourceFile, visitNode) as ts.SourceFile;
      if (resourceImportDeclarations.length) {
        // Add resource imports
        return nodeFactory.updateSourceFile(
          updatedSourceFile,
          ts.setTextRange(
            nodeFactory.createNodeArray([...resourceImportDeclarations, ...updatedSourceFile.statements]),
            updatedSourceFile.statements,
          ),
        );
      }

      return updatedSourceFile;
    };
  };
}

function visitClassDeclaration(
  nodeFactory: ts.NodeFactory,
  typeChecker: ts.TypeChecker,
  node: ts.ClassDeclaration,
  resourceImportDeclarations: ts.ImportDeclaration[],
  moduleKind: ts.ModuleKind | undefined,
): ts.ClassDeclaration {
  let decorators: ts.Decorator[] | undefined;
  let modifiers: ts.Modifier[] | undefined;

  if (IS_TS_48) {
    node.modifiers?.forEach((modifier) => {
      if (ts.isDecorator(modifier)) {
        decorators ??= [];
        decorators.push(modifier);
      } else {
        modifiers = modifiers ??= [];
        modifiers.push(modifier);
      }
    });
  } else {
    decorators = [...(ts.getDecorators(node) ?? [])];
    modifiers = [...(ts.getModifiers(node) ?? [])];
  }

  if (!decorators || !decorators.length) {
    return node;
  }

  decorators = decorators.map((current) =>
    visitDecorator(nodeFactory, current, typeChecker, resourceImportDeclarations, moduleKind),
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return IS_TS_48
    ? nodeFactory.updateClassDeclaration(
        node,
        [...decorators, ...(modifiers ?? [])],
        node.name,
        node.typeParameters,
        node.heritageClauses,
        node.members,
      )
    : (nodeFactory as any).updateClassDeclaration(
        node,
        decorators,
        modifiers,
        node.name,
        node.typeParameters,
        node.heritageClauses,
        node.members,
      );
  /* eslint-enable @typescript-eslint/no-explicit-any */
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
      ? visitComponentMetadata(nodeFactory, node, resourceImportDeclarations, moduleKind)
      : node,
  );

  // replace properties with updated properties
  if (styleReplacements.length) {
    const styleProperty = nodeFactory.createPropertyAssignment(
      nodeFactory.createIdentifier(STYLES),
      nodeFactory.createArrayLiteralExpression(styleReplacements),
    );

    properties = nodeFactory.createNodeArray([...properties, styleProperty]);
  }

  return nodeFactory.updateDecorator(
    node,
    nodeFactory.updateCallExpression(decoratorFactory, decoratorFactory.expression, decoratorFactory.typeArguments, [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nodeFactory.updateObjectLiteralExpression(objectExpression, properties as any),
    ]),
  );
}

function visitComponentMetadata(
  nodeFactory: ts.NodeFactory,
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
      const url = getResourceUrl(node.initializer);
      if (!url) {
        return node;
      }
      const importName = createResourceImport(nodeFactory, url, resourceImportDeclarations, moduleKind);
      if (!importName) {
        return node;
      }

      return nodeFactory.updatePropertyAssignment(node, nodeFactory.createIdentifier(TEMPLATE), importName);

    case STYLES:
      if (!ts.isArrayLiteralExpression(node.initializer) && !ts.isStringLiteral(node.initializer)) {
        return node;
      }

      return undefined;

    case STYLE_URLS:
      if (!ts.isArrayLiteralExpression(node.initializer)) {
        return node;
      }

      return undefined;

    case STYLE_URL:
      if (!ts.isStringLiteral(node.initializer)) {
        return node;
      }

      return undefined;

    default:
      return node;
  }
}

function getResourceUrl(node: ts.Node): string | null {
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
  const urlLiteral = nodeFactory.createStringLiteral(url);
  if (moduleKind < ts.ModuleKind.ES2015) {
    return nodeFactory.createCallExpression(nodeFactory.createIdentifier(REQUIRE), [], [urlLiteral]);
  } else {
    const importName = nodeFactory.createIdentifier(`__NG_CLI_RESOURCE__${resourceImportDeclarations.length}`);
    let importDeclaration: ts.ImportDeclaration;
    if (IS_AFTER_TS_50) {
      importDeclaration = nodeFactory.createImportDeclaration(
        undefined,
        nodeFactory.createImportClause(false, importName, undefined),
        urlLiteral,
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      importDeclaration = (nodeFactory as any).createImportDeclaration(
        undefined,
        undefined,
        nodeFactory.createImportClause(false, importName, undefined),
        urlLiteral,
      );
    }
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
