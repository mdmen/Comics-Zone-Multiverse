const { title, description } = require('../../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { sourceFolder } = require('../helpers');

module.exports = () =>
  new HtmlWebpackPlugin({
    template: `${sourceFolder}/index.html`,
    scriptLoading: 'defer',
    title,
    description,
  });
