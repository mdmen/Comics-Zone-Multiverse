const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isProduction } = require('../helpers');

module.exports = () => ({
  test: /\.css$/,
  use: [
    isProduction() ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
  ],
});
