export function importB() {
    return import('./b.mjs').then((module) => module.b);
}
