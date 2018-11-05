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

HTMLCanvasElement.prototype.getContext = function () {
    return {
        fillRect: function() {},
        clearRect: function() {},
        getImageData: function(_x, _y, w, h) {
            return {
                data: new Array(w * h * 4)
            };
        },
        putImageData: function() {},
        createImageData: function() { return []; },
        setTransform: function() {},
        drawImage: function() {},
        save: function() {},
        fillText: function() {},
        restore: function() {},
        beginPath: function() {},
        moveTo: function() {},
        lineTo: function() {},
        closePath: function() {},
        stroke: function() {},
        translate: function() {},
        scale: function() {},
        rotate: function() {},
        arc: function() {},
        fill: function() {},
        measureText: function() {
            return { width: 0 };
        },
        transform: function() {},
        rect: function() {},
        clip: function() {},
        bezierCurveTo: function() {}
    };
};

HTMLCanvasElement.prototype.toDataURL = function () {
    return "data:image/png;base64,";
};

