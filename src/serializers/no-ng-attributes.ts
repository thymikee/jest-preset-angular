import { plugins, type NewPlugin } from 'pretty-format';

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

const removeAngularAttributes = (node: Element): Element => {
    const nodeCopy = node.cloneNode(true) as Element;
    Object.values(nodeCopy.attributes)
        .filter(hasAttributesToRemove)
        .forEach((attribute) => nodeCopy.attributes.removeNamedItem(attribute.name));

    return nodeCopy;
};

const cleanAngularClasses = (node: Element): Element => {
    const nodeCopy = node.cloneNode(true) as Element;
    Object.values(nodeCopy.attributes)
        .filter(hasAttributesToClean)
        .forEach((attribute) => {
            attribute.value = attribute.value
                .split(' ')
                .filter(
                    (attrValue) =>
                        !attributesToClean[attribute.name].some((attributeCleanRegex) =>
                            attributeCleanRegex.test(attrValue),
                        ),
                )
                .join(' ');
            if (attribute.value === '') {
                nodeCopy.attributes.removeNamedItem(attribute.name);
            } else {
                nodeCopy.attributes.setNamedItem(attribute);
            }
        });

    return nodeCopy;
};

const shouldSerializeElement = (val: Element): boolean => {
    return Object.values(val.attributes).some(
        (attribute) => hasAttributesToRemove(attribute) || hasAttributesToClean(attribute),
    );
};

const serialize: NewPlugin['serialize'] = (node, ...rest) => {
    let nodeCopy = removeAngularAttributes(node);
    nodeCopy = cleanAngularClasses(nodeCopy);

    return jestDOMElementSerializer.serialize(nodeCopy, ...rest);
};

const test: NewPlugin['test'] = (val) => {
    if (!val || !(val instanceof Element)) {
        return false;
    }

    return jestDOMElementSerializer.test(val) && shouldSerializeElement(val);
};

export = {
    serialize,
    test,
} satisfies NewPlugin;
