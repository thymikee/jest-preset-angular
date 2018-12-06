/*
 * Code is inspired by
 * https://github.com/kulshekhar/ts-jest/blob/25e1c63dd3797793b0f46fa52fdee580b46f66ae/src/transformers/hoist-jest.ts
 * 
 */

/* 
 * IMPLEMENTATION DETAILS:
 * This transformer handles two concerns: removing styles and inlining referenced templates.
 *
 * The assignments can be located anywhere in a file.
 * Caveats:
 * All properties 'templateUrl', 'styles', 'styleUrls' ANYWHERE will be modified, even if they
 * are not used in the context of an Angular Component.
 * 
 * The AST has to simply look like this anywhere in a ts file:
 * 
 * PropertyAssignment
 *   Identifier
 *   Initializer
 */


// only import types, for the rest use injected `ConfigSet.compilerModule`
import TS, {
  Node,
  SourceFile,
  TransformationContext,
  Transformer,
  Visitor,
  PropertyAssignment,
  Identifier,
  StringLiteral,
} from 'typescript'

// replace original ts-jest ConfigSet with this simple interface, as it would require
// jest-preset-angular to add several babel devDependencies to get the other types
// inside the ConfigSet right
interface ConfigSet {
  compilerModule: typeof TS
}

/** Angular component decorator TemplateUrl property name */
const TEMPLATE_URL = 'templateUrl'
/** Angular component decorator StyleUrls property name */
const STYLE_URLS = 'styleUrls'
/** Angular component decorator Styles property name */
const STYLES = 'styles'
/** Angular component decorator Template property name */
const TEMPLATE = 'template'
/** Node require function name */
const REQUIRE = 'require'

/**
 * Property names inside the decorator argument to transform
 */
const TRANSFORM_PROPS = [TEMPLATE_URL, STYLES, STYLE_URLS]

/**
 * Transformer ID
 * @internal
 */
export const name = 'angular-component-inline-template-strip-styles'

// increment this each time the code is modified
/**
 * Transformer Version
 * @internal
 */
export const version = 1

/**
 * The factory of hoisting transformer factory
 * @internal
 */
export function factory(cs: ConfigSet) {

  /**
   * Our compiler (typescript, or a module with typescript-like interface)
   */
  const ts = cs.compilerModule

  /**
   * Traverses the AST down to the relevant assignments in the decorator
   * argument and returns them in an array.
   */
  function isPropertyAssignmentToTransform(node: Node): node is PropertyAssignment {
    return ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      TRANSFORM_PROPS.includes(node.name.text)
  }

  /**
   * Clones the assignment and manipulates it depending on its name.
   * @param node the property assignment to change
   */
  function transfromPropertyAssignmentForJest(node: PropertyAssignment) {

    const mutableAssignment = ts.getMutableClone(node)

    const assignmentNameText = (mutableAssignment.name as Identifier).text

    switch (assignmentNameText) {
      case TEMPLATE_URL:
        // reuse the right-hand-side literal from the assignment
        let templatePathLiteral = mutableAssignment.initializer

        // fix templatePathLiteral if it was a non-relative path
        if (ts.isStringLiteral(mutableAssignment.initializer)) {
          const templatePathStringLiteral: StringLiteral = mutableAssignment.initializer;
          // match if it starts with ./ or ../ or /
          if (templatePathStringLiteral.text &&
              !templatePathStringLiteral.text.match(/^(\.\/|\.\.\/|\/)/)) {
            // make path relative by appending './'
            templatePathLiteral = ts.createStringLiteral(`./${templatePathStringLiteral.text}`)
          }
        }

        // replace 'templateUrl' with 'template'
        mutableAssignment.name = ts.createIdentifier(TEMPLATE)
        // replace current initializer with require(path)
        mutableAssignment.initializer = ts.createCall(
          /* expression */ ts.createIdentifier(REQUIRE),
          /* type arguments */ undefined,
          /* arguments array */ [templatePathLiteral]
        )
        break;
      case STYLES:
      case STYLE_URLS:
        // replace initializer array with empty array
        mutableAssignment.initializer = ts.createArrayLiteral()
        break;
    }

    return mutableAssignment
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
    const visitor: Visitor = node => {

      let resultNode: Node

      // before we create a deep clone to modify, we make sure that
      // this is an assignment which we want to transform
      if (isPropertyAssignmentToTransform(node)) {

        // get transformed node with changed properties
        resultNode = transfromPropertyAssignmentForJest(node)
      } else {
        // look for interesting assignments inside this node
        resultNode = ts.visitEachChild(node, visitor, ctx)
      }

      // finally return the currently visited node
      return resultNode
    }
    return visitor
  }

  return (ctx: TransformationContext): Transformer<SourceFile> =>
    (sf: SourceFile) => ts.visitNode(sf, createVisitor(ctx, sf))
}
