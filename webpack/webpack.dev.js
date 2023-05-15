const { distFolder, sourceFolder } = require('./helpers');

const mode = 'development';

module.exports = {
  mode,
  entry: [`${sourceFolder}/index.ts`],
  devtool: 'eval-cheap-source-map',
  output: {
    filename: '[name].js',
    path: distFolder,
    clean: true,
  },
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
  plugins: [require('./plugins/html')(), require('./plugins/copy')()],
  resolve: {
    extensions: ['.ts'],
  },
};
