import { MarkerClusterer } from '@googlemaps/markerclusterer';
import camelCase from 'lodash-es/camelCase';
import { __assign } from 'tslib';

test('should pass', () => {
  expect(typeof MarkerClusterer).toBe('function');
  expect(camelCase('foo-bar')).toBe('fooBar');
  expect(typeof __assign).toBe('function');
});
