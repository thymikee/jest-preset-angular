const {process} = require('../preprocessor');

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
})`
];

const config = {
  "globals": {
    "__TS_CONFIG__": "example/src/tsconfig.spec.json",
    "__TRANSFORM_HTML__": true
  },
}

sources.forEach(source => {
  test(`works with ${source}`, () => {
    const result = process(source, '', config);
    expect(result).toMatch('styles: []');
    expect(result).toMatch('template: require(\'./media-box-h0.component.html\')');
  });
});
