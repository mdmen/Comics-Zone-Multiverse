const path = require('path');

module.exports = {
  sourceFolder: path.resolve(__dirname, '../src'),
  distFolder: path.resolve(__dirname, '../dist'),
  isProduction: () => process.env.NODE_ENV === 'production',
  minify: (str) => str.replace(/\r?\n|\r|\s{2,}/g, '').trim(),
};
