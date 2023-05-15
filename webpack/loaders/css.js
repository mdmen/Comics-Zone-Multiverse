const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isProduction } = require('../helpers');

module.exports = (mode) => ({
  test: /\.css$/,
  use: [
    isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
  ],
});
