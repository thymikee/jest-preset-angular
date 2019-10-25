import { types, PluginObj } from '@babel/core';

const plugin = (_api: any): PluginObj => ({
  visitor: {
    ObjectProperty(path) {
      const node = path.node;
      if (!types.isIdentifier(node.key)) return;

      if (node.key.name === 'templateUrl') {
        if (!types.isStringLiteral(node.value)) return;
        const requireIdentifier = types.identifier('require');
        let templateUrl = node.value.value;
        if (!templateUrl.match(/^(\.\/|\.\.\/|\/)/)) {
          templateUrl = `./${templateUrl}`;
        }
        const templateUrlStringLiteral = types.stringLiteral(templateUrl);
        const templateCallExpr = types.callExpression(requireIdentifier, [templateUrlStringLiteral]);
        const templateIdentifier = types.identifier('template');
        const templateProperty = types.objectProperty(templateIdentifier, templateCallExpr);
        path.replaceWith(templateProperty);

      } else if (node.key.name === 'styleUrls') {
        if (!types.isArrayExpression(node.value)) return;
        if (node.value.elements.length === 0) return;
        const emptyArray = types.arrayExpression([]);
        const styleUrlsIdentifier = types.identifier('styleUrls');
        const styleUrlsProperty = types.objectProperty(styleUrlsIdentifier, emptyArray);
        path.replaceWith(styleUrlsProperty);
      }
    }
  }
})

export = plugin;
