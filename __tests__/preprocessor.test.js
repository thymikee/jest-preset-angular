const process = require('../preprocessor').process;

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
})`
];

const config = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'example/src/tsconfig.spec.json'
    },
    __TRANSFORM_HTML__: true
  }
};

sources.forEach(source => {
  test(`works with ${source}`, () => {
    const result = process(source, '', config);
    expect(result).toMatch('styles: []');
    expect(result).toMatch(
      "template: require('./media-box-h0.component.html')"
    );
  });
});
