/*
 * Code is inspired by
 * https://github.com/kulshekhar/ts-jest/blob/25e1c63dd3797793b0f46fa52fdee580b46f66ae/src/transformers/hoist-jest.spec.ts
 *
 */

import * as tsc from 'typescript';

import * as transformer from '../StripStylesTransformer';

const CODE_WITH_STYLES_AND_OTHER_ASSIGNMENTS = `
  import { Component } from '@angular/core';

  @SomeDecorator({
    value: 'test',
    styles: [
      ':host { background-color: red }'
    ],
  })
  @Component({
    templateUrl: './page.html',
    styleUrls: [
      './fancy-styles.css',
      './basic-styles.scss'
    ],
    styles: [
      'body { display: none }',
      'html { background-color: red }'
    ],
    unaffectedProperty: 'whatever'
  })
  export class AngularComponent {
  }
`;

const CODE_WITH_ASSIGNMENT_OUTSIDE_DECORATOR = `
  const assignmentsToNotBeTransformed = {
    styles: [{
      color: 'red'
    }]
  };
`;

const createFactory = () => {
  return transformer.factory({ compilerModule: tsc } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
};
const transpile = (source: string) => tsc.transpileModule(source, { transformers: { before: [createFactory()] } });

describe('inlining template and stripping styles', () => {
  it('should not strip styleUrls assignment', () => {
    const out = transpile(CODE_WITH_STYLES_AND_OTHER_ASSIGNMENTS);

    expect(out.outputText).toMatchSnapshot();
  });

  it('should not transform styles outside decorator', () => {
    const out = transpile(CODE_WITH_ASSIGNMENT_OUTSIDE_DECORATOR);

    expect(out.outputText).toMatchSnapshot();
  });
});
