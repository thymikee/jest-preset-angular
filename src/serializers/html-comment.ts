const HTML_ELEMENT_REGEXP = /Comment/;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const test = (value: any): boolean =>
    value?.nodeType === 8 && value.constructor !== undefined && HTML_ELEMENT_REGEXP.test(value.constructor.name);

const serialize = (): string => '';

export = {
    serialize,
    test,
};
