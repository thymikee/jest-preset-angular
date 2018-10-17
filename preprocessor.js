// TODO: the html part of this file is handled by ts-jest,
// but the `styleUrls` and `templateUrl` parts needs to have their AST transformer
// It is not documented in ts-jest, but AST transformers can be defined in the ts-jest
// within jest config file, on the `transformers` option. It should be an array of path to files being
// ts-jest transformers definition. AN example of such fle can be found here:
// https://github.com/kulshekhar/ts-jest/blob/master/src/transformers/hoist-jest.ts
// name, version and factory are the 3 required symbols to export

const process = require('ts-jest').process;
const TEMPLATE_URL_REGEX = /templateUrl\s*:\s*('|"|`)(\.\/){0,}(.*)('|"|`)/g;
const STYLE_URLS_REGEX = /styleUrls\s*:\s*\[[^\]]*\]/g;
const ESCAPE_TEMPLATE_REGEX = /(\${|\`)/g;

module.exports.process = (src, path, config, transformOptions) => {
  if (path.endsWith('.html')) {
    src = src.replace(ESCAPE_TEMPLATE_REGEX, '\\$1');
  }
  src = src
    .replace(TEMPLATE_URL_REGEX, 'template: require($1./$3$4)')
    .replace(STYLE_URLS_REGEX, 'styles: []');
  return process(src, path, config, transformOptions);
};
