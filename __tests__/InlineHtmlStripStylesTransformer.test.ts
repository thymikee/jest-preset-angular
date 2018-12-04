/*
 * Code is inspired by
 * https://github.com/kulshekhar/ts-jest/blob/25e1c63dd3797793b0f46fa52fdee580b46f66ae/src/transformers/hoist-jest.spec.ts
 * 
 */

import * as tsc from 'typescript'
import * as transformer from '../InlineHtmlStripStylesTransformer'

const CODE_WITH_TEMPLATE_URL = `
  import { Component } from '@angular/core';

  @Component({
    templateUrl: './page.html'
  })
  export class AngularComponent {
  }
`

const CODE_WITH_NON_RELATIVE_TEMPLATE_URL = `
  import { Component } from '@angular/core';

  @Component({
    templateUrl: 'page.html'
  })
  export class AngularComponent {
  }
`

const CODE_WITH_STYLE_URLS = `
  import { Component } from '@angular/core';

  @Component({
    styleUrls: [
      './fancy-styles.css',
      './basic-styles.scss'
    ]
  })
  export class AngularComponent {
  }
`

const CODE_WITH_STYLES = `
  import { Component } from '@angular/core';

  @Component({
    styles: [
      'body: { display: none }',
      'html: { background-color: red }'
    ]
  })
  export class AngularComponent {
  }
`

const CODE_WITH_ALL_DECORATOR_PROPERTIES = `
  import { Component } from '@angular/core';

  @SomeDecorator({
    value: 'test'
  })
  @Component({
    templateUrl: './page.html',
    styleUrls: [
      './fancy-styles.css',
      './basic-styles.scss'
    ],
    styles: [
      'body: { display: none }',
      'html: { background-color: red }'
    ],
    unaffectedProperty: 'whatever'
  })
  @SomeOtherDecorator({
    prop: 'ok'
  })
  export class AngularComponent {
  }
`

const CODE_WITH_CUSTOM_DECORATOR = `
  import { Component as CustomDecoratorName } from '@angular/core';

  @CustomDecoratorName({
    templateUrl: './page.html'
  })
  export class AngularComponent {
  }
`



const createFactory = () => {
  return transformer.factory({ compilerModule: tsc } as any)
}
const transpile = (source: string) => tsc.transpileModule(source, { transformers: { before: [createFactory()] } })

describe('inlining template and stripping styles', () => {
  it('should have correct signature', () => {
    expect(transformer.name).toBe('angular-component-inline-template-strip-styles')
    expect(typeof transformer.version).toBe('number')
    expect(transformer.version).toBeGreaterThan(0)
    expect(typeof transformer.factory).toBe('function')
  })

  it('should strip styleUrl assignment', () => {
    const out = transpile(CODE_WITH_STYLE_URLS)

    expect(out.outputText).toMatchSnapshot()
  })

  it('should strip styles assignment', () => {
    const out = transpile(CODE_WITH_STYLES)

    expect(out.outputText).toMatchSnapshot()
  })

  it('should inline templateUrl assignment', () => {
    const out = transpile(CODE_WITH_TEMPLATE_URL)

    expect(out.outputText).toMatchSnapshot()
  })

  it('should inline non-relative templateUrl assignment and make it relative', () => {
    const out = transpile(CODE_WITH_NON_RELATIVE_TEMPLATE_URL)

    expect(out.outputText).toMatchSnapshot()
  })

  it('should handle all transformable decorator assignments', () => {
    const out = transpile(CODE_WITH_ALL_DECORATOR_PROPERTIES)

    expect(out.outputText).toMatchSnapshot()
  })

  it('should handle all decorator assignments in differently named decorators', () => {
    const out = transpile(CODE_WITH_CUSTOM_DECORATOR)

    expect(out.outputText).toMatchSnapshot()
  })
})
