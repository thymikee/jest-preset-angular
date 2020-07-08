import type * as _ts from 'typescript';
type TTypeScript = typeof _ts;
type CreateStringLiteral = typeof _ts.createStringLiteral;


/**
 * returns the compiler function to create a string literal. If an old version
 * of the TypeScript module is used, it will create a function that replaces the
 * behavior of the `createStringLiteral` function.
 * @param ts TypeScript compiler module
 */
export function getCreateStringLiteral(
  ts: TTypeScript
): CreateStringLiteral {
  if (ts.createStringLiteral && typeof ts.createStringLiteral === 'function') {
    return ts.createStringLiteral;
  }
  return function createStringLiteral(text: string) {
    const node = <_ts.StringLiteral>(
      ts.createNode(ts.SyntaxKind.StringLiteral, -1, -1)
    );
    node.text = text;
    node.flags |= ts.NodeFlags.Synthesized;
    return node;
  };
}
