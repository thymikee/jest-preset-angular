import * as TS from 'typescript';

// replace original ts-jest ConfigSet with this simple interface, as it would require
// jest-preset-angular to add several babel devDependencies to get the other types
// inside the ConfigSet right
export interface ConfigSet {
  compilerModule: typeof TS;
}

/**
 * returns the compiler function to create a string literal. If an old version
 * of the TypeScript module is used, it will create a function that replaces the
 * behavior of the `createStringLiteral` function.
 * @param ts TypeScript compiler module
 */
export function getCreateStringLiteral(
  ts: typeof TS
): typeof TS.createStringLiteral {
  if (ts.createStringLiteral && typeof ts.createStringLiteral === 'function') {
    return ts.createStringLiteral;
  }
  return function createStringLiteral(text: string) {
    const node = <TS.StringLiteral>(
      ts.createNode(ts.SyntaxKind.StringLiteral, -1, -1)
    );
    node.text = text;
    node.flags |= ts.NodeFlags.Synthesized;
    return node;
  };
}
