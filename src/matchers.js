expect.extend({
    toHaveCssClass(actual, className) {
        const pass = actual.classList.contains(className);

        let message = "";
        if (!pass) {
            message = `Expected ${actual.outerHTML} to contain the CSS class "${className}"`;
        }

        const result = {
            message: message,
            pass: pass
        };

        return result;
    }
});

