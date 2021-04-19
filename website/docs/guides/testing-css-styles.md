---
id: testing-css-styles
title: Testing CSS Styles
---

Starting from **v9.0.0**, `jest-preset-angular` supports testing CSS styles. The supported style extensions following
Angular support, which are: `css`, `sass`, `scss`, `less` and `styl`. This is provided default by `jest-preset-angular`.

One now can use [window.getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)
to check styling of DOM elements. The styles which are returned by `window.getComputedStyle` come from styling files.

## Example

```
// ...TestBed setup

const elementToFind = fixture.debugElement.nativeElement.querySelector('p');
expect(window.getComputedStyle(elementToFind).color).toEqual('red');
```

:::important

To be able to use `window.getComputedStyle` API, please make sure that you remove

```
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});
```

or any codes that override the default behavior of `window.getComputedStyle` in your setup file or your global mock file.

:::
