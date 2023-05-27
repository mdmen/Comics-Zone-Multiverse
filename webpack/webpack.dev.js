const { distFolder, sourceFolder } = require('./helpers');

const mode = 'development';

module.exports = {
  mode,
  entry: [`${sourceFolder}/index.ts`],
  devServer: {
    static: distFolder,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      require('./loaders/css')(mode),
      require('./loaders/typescript')(),
      ...require('./loaders/assets')(),
    ],
  },
  plugins: [require('./plugins/html')()],
  resolve: require('./resolve')(),
};
