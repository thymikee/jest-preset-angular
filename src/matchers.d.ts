declare namespace jest {
    interface Matchers<R> {
        toHaveCssClass(className: string): R;
    }
}

