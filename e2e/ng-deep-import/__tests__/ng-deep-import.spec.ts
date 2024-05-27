import localeFr from '@angular/common/locales/fr';

test('should work with deep import of Angular ESM package', () => {
    expect(localeFr).toBeDefined();
});
