export const babelAngularConfig = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['babel-plugin-transform-typescript-metadata', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['jest-preset-angular/build/babel/plugin-inline-angular-template'],
    ['const-enum']
  ]
};
