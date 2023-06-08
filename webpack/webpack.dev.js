const { distFolder, sourceFolder } = require('./helpers');

module.exports = {
  mode: 'development',
  entry: [`${sourceFolder}/index.ts`],
  devServer: {
    static: distFolder,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      require('./loaders/css')(),
      require('./loaders/typescript')(),
      ...require('./loaders/assets')(),
    ],
  },
  plugins: [require('./plugins/html')()],
  resolve: require('./resolve')(),
};
