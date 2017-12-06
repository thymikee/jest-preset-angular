Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
        getPropertyValue: (prop) => {
            // Report font-size of 0 to disable drawDOM text export
            if (prop === 'font-size') {
                return '0';
            }

            return '';
        }
    })
});

[HTMLElement, HTMLTableCellElement, HTMLTableRowElement].forEach(nodeType =>
    Object.defineProperty(nodeType.prototype, 'innerText', {
        get: function() {
            return [... this.childNodes]
                .map(node => {
                    if (node.nodeType === node.TEXT_NODE) {
                        return node.textContent.trim();
                    } else if (node.innerText) {
                        return node.innerText;
                    } else {
                        return '';
                    }
                })
                .filter(content => content !== '')
                .join(' ')
                .split('\n')
                .map(line => line.trim())
                .join('');
        }
    })
);

const getPrototypeOf = Object.getPrototypeOf;
Object.getPrototypeOf = function(obj) {
    if (!obj) {
        return null;
    }

    return getPrototypeOf.apply(Object, [obj]);
};
