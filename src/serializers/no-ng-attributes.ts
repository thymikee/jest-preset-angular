import { plugins } from 'pretty-format';

const jestDOMElementSerializer = plugins.DOMElement;

const attributesToRemovePatterns = ['ng-reflect', '_nghost', '_ngcontent', 'ng-version'];
const attributesToClean: Record<string, RegExp[]> = {
  class: [/^(?:mat|cdk|ng).*-\w*\d+-\d+$/, /^ng-star-inserted$/], // e.g. "ng-tns-c25-1" or "ng-star-inserted", literally
  id: [/^(?:mat|cdk|ng).*-\d+$/], // e.g. "mat-input-4", "cdk-step-content-0-0"
  for: [/^(?:mat|cdk|ng).*-\d+$/], // e.g. "mat-form-field-label-9"
  'aria-owns': [/^(?:mat|cdk|ng).*-\d+$/], // e.g. "mat-input-4"
  'aria-labelledby': [/^(?:mat|cdk|ng).*-\d+$/], // e.g. "mat-input-4", "cdk-step-label-0-0"
  'aria-controls': [/^(?:mat|cdk|ng).*-\d+$/], // e.g. "cdk-step-content-2-0"
};
const hasAttributesToRemove = (attribute: Attr): boolean =>
  attributesToRemovePatterns.some((removePattern) => attribute.name.startsWith(removePattern));
const hasAttributesToClean = (attribute: Attr): boolean =>
  Object.keys(attributesToClean).some((removePatternKey) => attribute.name === removePatternKey);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const serialize = (node: Element, ...rest: any): string => {
  const nodeCopy = node.cloneNode(true) as Element;
  // Remove angular-specific attributes
  Object.values(nodeCopy.attributes)
    .filter(hasAttributesToRemove)
    .forEach((attribute) => nodeCopy.attributes.removeNamedItem(attribute.name));
  // Remove angular auto-added classes
  Object.values(nodeCopy.attributes)
    .filter(hasAttributesToClean)
    .forEach((attribute: Attr) => {
      attribute.value = attribute.value
        .split(' ')
        .filter(
          (attrValue: string) =>
            !attributesToClean[attribute.name].some((attributeCleanRegex) => attributeCleanRegex.test(attrValue)),
        )
        .join(' ');
      if (attribute.value === '') {
        nodeCopy.attributes.removeNamedItem(attribute.name);
      } else {
        nodeCopy.attributes.setNamedItem(attribute);
      }
    });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return jestDOMElementSerializer.serialize(nodeCopy, ...rest);
};

const serializeTestFn = (val: Element): boolean =>
  !!val.attributes &&
  Object.values(val.attributes).some(
    (attribute: Attr) => hasAttributesToRemove(attribute) || hasAttributesToClean(attribute),
  );
const test = (val: unknown): boolean => !!val && jestDOMElementSerializer.test(val) && serializeTestFn(val as Element);

export = {
  serialize,
  test,
};
