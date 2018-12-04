/*
 * Code is inspired by
 * https://github.com/kulshekhar/ts-jest/blob/25e1c63dd3797793b0f46fa52fdee580b46f66ae/src/transformers/hoist-jest.ts
 * 
 */



/* 
 * IMPLEMENTATION DETAILS:
 * This transformer handles two concerns: removing styles and inlining referenced templates,
 * as they both are handled at the same location in the AST.
 *
 * The Component can be located anywhere in a file, except inside another Angular Component.
 * The Decorator is not checked for the name 'Component', as someone might import it under
 * a different name, or have their custom, modified version of the component decorator.
 * Instead it checks for specific properties inside any class decorator.
 * Caveats:
 * All properties 'templateUrl', 'styles', 'styleUrls' inside ANY decorator will be modified.
 * If the decorator content is referenced, it will not work:
 * ```ts
 * const componentArgs = {}
 * @Component(componentArgs)
 * class MyComponent { }
 * ```
 * 
 * The AST has to look like this:
 * 
 * ClassDeclaration
 *   Decorator
 *     CallExpression
 *       ObjectLiteralExpression
 *         PropertyAssignment
 *           Identifier
 *           StringLiteral
 * 
 * Where some additional Check have to be made to identify the node as the required kind:
 * 
 * ClassDeclaration: isClassDeclaration
 *   Decorator
 *     CallExpression: isCallExpression
 *       ObjectLiteralExpression: isObjectLiteral
 *         PropertyAssignment: isPropertyAssignment
 *           Identifier: isIdentifier
 *           StringLiteral: isStringLiteral
 * 
 */


// take care of importing only types, for the rest use injected `ts`
import TS, {
  Node,
  SourceFile,
  TransformationContext,
  Transformer,
  Visitor,
  ClassDeclaration,
  CallExpression,
  ObjectLiteralExpression,
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
   * Array Flatten function, as there were problems to make the compiler use
   * esnext's Array.flat, can be removed in the future.
   * @param arr Array to be flattened
   */
  function flatten<T>(arr: (T | T[] | T[][])[]): T[] {
    return arr.reduce(
      (xs: T[], x) => Array.isArray(x) ? xs.concat(flatten(x as T[])) : xs.concat(x),
      []
    ) as T[]
  }

  /**
   * Our compiler (typescript, or a module with typescript-like interface)
   */
  const ts = cs.compilerModule

  /**
   * Traverses the AST down to the relevant assignments in the decorator
   * argument and returns them in an array.
   */
  function getPropertyAssignmentsToTransform(classDeclaration: ClassDeclaration) {
    return flatten<PropertyAssignment>(classDeclaration.decorators!
      .map(dec => dec.expression)
      .filter(ts.isCallExpression)
      .map(callExpr => (callExpr as CallExpression).arguments
        .filter(ts.isObjectLiteralExpression)
        .map(arg => (arg as ObjectLiteralExpression).properties
          .filter(ts.isPropertyAssignment)
          .map(arg => arg as PropertyAssignment)
          .filter(propAss => ts.isIdentifier(propAss.name))
          .filter(propAss => TRANSFORM_PROPS.includes((propAss.name as Identifier).text))
        )
      )
    )
  }

  /**
   * Clones the node, identifies the properties to transform in the decorator and modifies them.
   * @param node class declaration with decorators
   */
  function transfromDecoratorForJest(node: ClassDeclaration) {

    const mutable = ts.getMutableClone(node)
    const assignments = getPropertyAssignmentsToTransform(mutable)

    assignments.forEach(assignment => {
      switch ((assignment.name as Identifier).text) {
        case TEMPLATE_URL:
          // we can reuse the right-hand-side literal from the assignment
          let templatePathLiteral = assignment.initializer

          // fix templatePathLiteral if it was a non-relative path
          if (ts.isStringLiteral(assignment.initializer)) {
            const templatePathStringLiteral: StringLiteral = assignment.initializer;
            // match if it starts with ./ or ../ or /
            if (templatePathStringLiteral.text &&
                !templatePathStringLiteral.text.match(/^(\.\/|\.\.\/|\/)/)) {
              // make path relative by appending './'
              templatePathLiteral = ts.createStringLiteral(`./${templatePathStringLiteral.text}`)
            }
          }

          // replace 'templateUrl' with 'template'
          assignment.name = ts.createIdentifier(TEMPLATE)
          // replace current initializer with require(path)
          assignment.initializer = ts.createCall(
            /* expression */ ts.createIdentifier(REQUIRE),
            /* type arguments */ undefined,
            /* arguments array */ [templatePathLiteral]
          )
          break;
        case STYLES:
        case STYLE_URLS:
          // replace initializer array with empty array
          assignment.initializer = ts.createArrayLiteral()
          break;
      }
    })
    return mutable
  }

  /**
   * Create a source file visitor which will visit all nodes in a source file
   * @param ctx The typescript transformation context
   * @param sf The owning source file
   */
  function createVisitor(ctx: TransformationContext, _: SourceFile) {

    /**
     * Our main visitor, which will be called recursively for each node in the source file's AST
     * @param node The node to be visited
     */
    const visitor: Visitor = node => {

      let resultNode: Node

      // before we create a deep clone to modify, we make sure that
      // this class has the decorator arguments of interest.
      if (
        ts.isClassDeclaration(node) &&
          node.decorators &&
          getPropertyAssignmentsToTransform(node).length
      ) {
        // get mutable node and change properties
        // NOTE: classes can be inside methods, but we do not
        // look for them inside Angular Components!
        // recursion ends here, as ts.visitEachChild is not called.
        resultNode = transfromDecoratorForJest(node)
      } else {
        // look for other classes with decorators
        // classes can be inside other statements (like if blocks)
        resultNode = ts.visitEachChild(node, visitor, ctx)
      }

      // finally returns the currently visited node
      return resultNode
    }
    return visitor
  }

  // returns the transformer factory
  return (ctx: TransformationContext): Transformer<SourceFile> =>
    (sf: SourceFile) => ts.visitNode(sf, createVisitor(ctx, sf))
}
