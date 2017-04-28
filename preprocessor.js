const {process} = require('ts-jest/preprocessor.js');
const TEMPLATE_URL_REGEX = /templateUrl:\s*('|")(.*)('|")/g;
const STYLE_URLS_REGEX = /styleUrls:\s*\[\s*((?:'|").*\s*(?:'|")).*\s*.*\]/g;

module.exports.process = (src, path, config) => {
  // Replace `templateUrl: ''` calls with `template: require('')`
  // and `styleUrls: ['']` with `styles: []`
  return process(
    src
      .replace(TEMPLATE_URL_REGEX, 'template: require($1./$2$3)')
      .replace(STYLE_URLS_REGEX, 'styles: []'),
    path,
    config
  );
};
