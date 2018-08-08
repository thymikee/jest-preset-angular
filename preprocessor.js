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
