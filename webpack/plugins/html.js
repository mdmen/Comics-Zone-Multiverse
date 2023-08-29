const fs = require('fs');
const { title, description } = require('../../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { sourceFolder } = require('../helpers');

const criticalStyles = fs
  .readFileSync(`${sourceFolder}/assets/styles/critical.css`)
  .toString();

module.exports = () =>
  new HtmlWebpackPlugin({
    template: `${sourceFolder}/index.html`,
    scriptLoading: 'defer',
    title,
    description,
    criticalStyles: `<style>${criticalStyles}</style>`,
  });
