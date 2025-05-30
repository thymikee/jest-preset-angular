import type { Config } from 'jest';

export = [
    'jest-preset-angular/build/serializers/html-comment',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/no-ng-attributes',
] satisfies Config['snapshotSerializers'];
