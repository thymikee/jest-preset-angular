/*
 * Code is inspired by
 * https://github.com/kulshekhar/ts-jest/blob/25e1c63dd3797793b0f46fa52fdee580b46f66ae/src/transformers/hoist-jest.ts
 *
 */

/*
 * IMPLEMENTATION DETAILS:
 * This transformer handles:
 *   - inlining referenced template files and
 *   - removing referenced style files.
 *
 * The assignments 'templateUrl', 'styleUrls' can be located anywhere in a file.
 * Caveats:
 * All properties 'templateUrl', 'styleUrls' ANYWHERE will be modified, even if they
 * are not used in the context of an Angular Component.
 *
 * The AST has to simply look like this anywhere in a ts file:
 *
 * PropertyAssignment
 *   Identifier
 *   Initializer
 */

// only import types, for the rest use injected `ConfigSet.compilerModule`
import type {
  Node,
  SourceFile,
  TransformationContext,
  Transformer,
  Visitor,
  PropertyAssignment,
  LiteralLikeNode,
  StringLiteral,
} from 'typescript';
import type { ConfigSet } from 'ts-jest/dist/config/config-set';

import { TEMPLATE_URL, STYLE_URLS, REQUIRE, TEMPLATE } from '../constants';

// replace original ts-jest ConfigSet with this simple interface, as it would require
// jest-preset-angular to add several babel devDependencies to get the other types
// inside the ConfigSet right

/**
 * Property names anywhere in an angular project to transform
 */
const TRANSFORM_PROPS = [TEMPLATE_URL, STYLE_URLS];

/**
 * Transformer ID
 * @internal
 */
export const name = 'angular-component-inline-files';

// increment this each time the code is modified
/**
 * Transformer Version
 * @internal
 */
export const version = 1;

/**
 * The factory of hoisting transformer factory
 * @internal
 */
export function factory(cs: ConfigSet): (ctx: TransformationContext) => Transformer<SourceFile> {
  /**
   * Our compiler (typescript, or a module with typescript-like interface)
   */
  const ts = cs.compilerModule;
  function getCreateStringLiteral(): typeof ts.createStringLiteral {
    if (ts.createStringLiteral && typeof ts.createStringLiteral === 'function') {
      return ts.createStringLiteral;
    }

    return function createStringLiteral(text: string) {
      const node = <StringLiteral>ts.createNode(ts.SyntaxKind.StringLiteral, -1, -1);
      node.text = text;
      node.flags |= ts.NodeFlags.Synthesized;

      return node;
    };
  }
  const createStringLiteral = getCreateStringLiteral();

  /**
   * Traverses the AST down to the relevant assignments anywhere in the file
   * and returns a boolean indicating if it should be transformed.
   */
  function isPropertyAssignmentToTransform(node: Node): node is PropertyAssignment {
    return ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && TRANSFORM_PROPS.includes(node.name.text);
  }

  /**
   * Clones the assignment and manipulates it depending on its name.
   * @param node the property assignment to change
   */
  function transfromPropertyAssignmentForJest(node: PropertyAssignment) {
    const mutableAssignment = ts.getMutableClone(node);
    const assignmentNameText = (mutableAssignment.name as LiteralLikeNode).text;
    switch (assignmentNameText) {
      case TEMPLATE_URL:
        // replace 'templateUrl' with 'template'

        // reuse the right-hand-side literal (the filepath) from the assignment
        // eslint-disable-next-line no-case-declarations
        let pathLiteral = mutableAssignment.initializer;

        // fix templatePathLiteral if it was a non-relative path
        if (ts.isStringLiteral(pathLiteral)) {
          // match if it does not start with ./ or ../ or /
          // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
          if (pathLiteral.text && !pathLiteral.text.match(/^(\.\/|\.\.\/|\/)/)) {
            // make path relative by prepending './'
            pathLiteral = createStringLiteral(`./${pathLiteral.text}`);
          }
        }

        // replace current initializer with require(path)
        // eslint-disable-next-line no-case-declarations
        const requireCall = ts.createCall(
          /* expression */ ts.createIdentifier(REQUIRE),
          /* type arguments */ undefined,
          /* arguments array */ [pathLiteral],
        );

        mutableAssignment.name = ts.createIdentifier(TEMPLATE);
        mutableAssignment.initializer = requireCall;
        break;

      case STYLE_URLS:
        // replace styleUrls value with emtpy array
        // inlining all urls would be way more complicated and slower
        mutableAssignment.initializer = ts.createArrayLiteral();
        break;
      default:
        break;
    }

    return mutableAssignment;
  }

  /**
   * Create a source file visitor which will visit all nodes in a source file
   * @param ctx The typescript transformation context
   * @param _ The owning source file
   */
  function createVisitor(ctx: TransformationContext, _: SourceFile) {
    /**
     * Our main visitor, which will be called recursively for each node in the source file's AST
     * @param node The node to be visited
     */
    const visitor: Visitor = (node) => {
      let resultNode = node;

      // before we create a deep clone to modify, we make sure that
      // this is an assignment which we want to transform
      if (isPropertyAssignmentToTransform(node)) {
        // get transformed node with changed properties
        resultNode = transfromPropertyAssignmentForJest(node);
      }

      // look for interesting assignments inside this node in any case
      resultNode = ts.visitEachChild(resultNode, visitor, ctx);

      // finally return the currently visited node
      return resultNode;
    };

    return visitor;
  }

  return (ctx: TransformationContext): Transformer<SourceFile> => (sf: SourceFile) =>
    ts.visitNode(sf, createVisitor(ctx, sf));
}
