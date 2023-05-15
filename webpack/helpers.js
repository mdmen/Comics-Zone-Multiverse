const path = require('path');

module.exports = {
  sourceFolder: path.resolve(__dirname, '../src'),
  distFolder: path.resolve(__dirname, '../dist'),
  isProduction: (mode) => mode === 'production',
};
