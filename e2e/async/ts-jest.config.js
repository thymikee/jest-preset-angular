module.exports = {
  tsconfig: {
    /** Angular doesn't work with ES2017+
     * see https://github.com/angular/components/issues/21632#issuecomment-764975917
     */
    target: 'ES2016',
  },
};
