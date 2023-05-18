const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');

module.exports = () =>
  new HtmlWebpackInjectPreload({
    files: [
      {
        match: /.*\.woff2$/,
        attributes: { as: 'font' },
      },
      {
        match: /.*\.mp3$/,
        attributes: { as: 'audio' },
      },
      {
        match: /.*\.webp$/,
        attributes: { as: 'image' },
      },
    ],
  });
