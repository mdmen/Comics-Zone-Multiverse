const CopyPlugin = require('copy-webpack-plugin');
const { sourceFolder, distFolder } = require('../helpers');

module.exports = () =>
  new CopyPlugin({
    patterns: [
      {
        from: `${sourceFolder}/assets/images/favicons`,
        to: `${distFolder}/favicons`,
      },
    ],
  });
