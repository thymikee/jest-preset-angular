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
/* tslint:disable:no-empty */

(window as any).HTMLCanvasElement.prototype.getContext = function (): any {
    return {
        fillRect: function(): void {},
        clearRect: function(): void {},
        getImageData: function(_x: any, _y: any, w: any, h: any): any {
            return {
                data: new Array(w * h * 4)
            };
        },
        putImageData: function(): void {},
        createImageData: function(): any[] { return []; },
        setTransform: function(): void {},
        drawImage: function(): void {},
        save: function(): void {},
        fillText: function(): void {},
        restore: function(): void {},
        beginPath: function(): void {},
        moveTo: function(): void {},
        lineTo: function(): void {},
        closePath: function(): void {},
        stroke: function(): void {},
        translate: function(): void {},
        scale: function(): void {},
        rotate: function(): void {},
        arc: function(): void {},
        fill: function(): void {},
        measureText: function(): any {
            return { width: 0 };
        },
        transform: function(): void {},
        rect: function(): void {},
        clip: function(): void {},
        bezierCurveTo: function(): void {}
    };
};

(window as any).HTMLCanvasElement.prototype.toDataURL = function (): string {
    return "data:image/png;base64,";
};
