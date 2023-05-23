const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');

module.exports = () =>
  new HtmlWebpackInjectPreload({
    files: [
      {
        match: /.*\.woff2$/,
        attributes: { as: 'font' },
      },
    ],
  });
