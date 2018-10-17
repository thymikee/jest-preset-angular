import { createTransformer } from 'ts-jest'

const sources = [
  `@Component({
  selector: 'xc-media-box-h0',
  templateUrl: './media-box-h0.component.html',
  styleUrls: [ '../media-box.component.scss' ],
})`,
  `@Component({
  selector: 'xc-media-box-h0',
  templateUrl: './media-box-h0.component.html',
  styleUrls: ['../media-box.component.scss',
  './media-box-h0.component.scss'],
})`,
  `@Component({
  selector: 'xc-media-box-h0',
  templateUrl: 'media-box-h0.component.html',
  styleUrls: [
    '../media-box.component.scss',
  ],
})`,
  `@Component({
  selector: 'xc-media-box-h0',
  templateUrl: 'media-box-h0.component.html',
  styleUrls: [
    '../media-box.component.scss',
    './media-box-h0.component.scss'
  ],
})`,
  `@Component({
  selector: 'xc-media-box-h0',
  templateUrl: 'media-box-h0.component.html',
  styleUrls: [
    '../../box.component.scss',
    '../media-box.component.scss',
    './media-box-h0.component.scss'
  ],
})`,
  `@Component({
  selector: 'xc-media-box-h0',
  templateUrl: 'media-box-h0.component.html',
  styleUrls: [
    '../../../box.component.scss',
    '../../box.component.scss',
    '../media-box.component.scss',
    './media-box-h0.component.scss'
  ],
})`,
  `@Component({
  selector    : 'xc-media-box-h0',
  templateUrl : 'media-box-h0.component.html',
  styleUrls   : [
    '../../../box.component.scss',
    '../../box.component.scss',
    '../media-box.component.scss',
    './media-box-h0.component.scss'
  ],
})`,
  // double quote
  `@Component({
  selector: 'xc-media-box-h0',
  templateUrl: "./media-box-h0.component.html",
  styleUrls: [ '../media-box.component.scss' ],
})`,
  // backtick
  `@Component({
  selector: 'xc-media-box-h0',
  templateUrl: \`./media-box-h0.component.html\`,
  styleUrls: [ '../media-box.component.scss' ],
})`,
];

const config = {
  rootDir: __dirname,
  cwd: __dirname,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$'
    },
  }
};

sources.forEach(source => {
  const processor = createTransformer()
  test(`works with ${source}`, () => {
    const result = processor.process(source, '', config);
    expect(result).toMatch('styles: []');
    expect(result).toMatch(
      /template: require\(['"`]\.\/media-box-h0\.component\.html['"`]\)/
    );
  });
});
